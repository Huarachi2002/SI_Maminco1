const express = require('express')
const {Usuario,TipoUsuario} = require('../models/usuario')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {config,configSMTP} = require('../config')
const nodemailer = require("nodemailer")
const Persona = require('../models/persona')
// const { Op } = require('sequelize')

const router = express.Router();

function createRandomNumber(){
    let Num="";
    for(var i=0;i<6;i++){
        Num+=Math.floor(Math.random()*10);
    }
    return Num;
}
router.post('/login',async (req,res) =>{
    const {nombre_usuario, contraseña} = req.body
    // console.log(nombre_usuario,contraseña);
    try{
        let user = await Usuario.findOne({
            where:{nombre_usuario,}
        })
        if(user){
            // console.log(user,typeof user);
            const result = bcrypt.compareSync(contraseña,user.contraseña);
            if(!result) return res.send({status:1,msg:'contraseña incorrecta'})
            //"eliminar" contraseña del user
            user.contraseña = undefined;
            let tipo = await TipoUsuario.findOne({
                attributes:['menu'],
                where:{id_tipo:user.id_tipo_usuario},
            })
            user.dataValues.menu = tipo.menu
            const tokenStr = jwt.sign(user.toJSON(),config.jwtSecretKey,{expiresIn:config.expiresIn});
            user.dataValues.token = 'Bearer '+ tokenStr;
            res.send({status:0,data:user});
        }else{
            res.send({status:1,msg:'usuario incorrecto o no existe el usuario'})
        }
        
    }catch(error){
        console.log(error);
        res.send({status:1,msg:error.name})
    };
})

//enviar un codigo de verificacion al correo de usuario 
router.get('/email',async(req,res)=>{
    const {nombre_usuario} = req.query
    const cod_verificacion = createRandomNumber()
    const fec_hora = new Date()
    // console.log(validez)
    try{
        const user = await Usuario.findOne({
            attributes:{exclude:['contraseña']},
            where:{nombre_usuario,}
        })
        // si existe el usuario
        if(user){
            //guardar el tiempo que fue generado el codigo de verificacion
            await Usuario.update({
                fec_hora,cod_verificacion
            },{where:{nombre_usuario}})

            // obtener datos de la persona que posee este usuario
            const person = await Persona.findOne({
                where:{id:user.id_persona}
            })
            console.log(person.e_mail) 

            // create reusable transporter object 
            let transporter = nodemailer.createTransport(configSMTP);
             // send mail with defined transport object
            await transporter.sendMail({
                from: 'h2wuy00@gmail.com', // sender address
                to: '844198657@qq.com', // list of receivers
                subject: "Código de Verificación", // Subject line
                text:'Estimado usuario: \n'+cod_verificacion+'\n es tu código para restablecer la contraseña de Restaurante Maminco RestoBar\n'+
                        'Recuerde que este código de verificación caduca en 10 minutos'
            });
            const pos = person.e_mail.indexOf('@')
            const mail = person.e_mail.substring(pos-4)
            res.send({status:0,msg:'Se acaba de enviar un mensaje de texto con un código de verificación de 6 dígitos al ****'+ mail})
        }else{
            res.send({status:1,msg:'no existe el usuario introducido'})
        }
    }catch(error){
        // console.log(error)
        res.send({status:1,msg:'no tienes email asociado a tu cuenta'})
    }
})

//modificar contraseña si el usuario se ha olvidado 
router.post('/change',async (req,res)=>{ 
    const {nombre_usuario, contraseña, cod_verificacion} = req.body

    //obtener el usuario
    const user = await Usuario.findOne({
        attributes:{exclude:['contraseña']},
        where:{nombre_usuario,}
    })

    if(user){
        // console.log(user)
        let nowDate = (new Date()).getTime();//obtener el tiempo
        // console.log(nowDate)

        //verificar el codigo y que no pase de los 10 minutos
        if(cod_verificacion === user.cod_verificacion && (nowDate - user.fec_hora.getTime()) < 600000){
            await Usuario.update({
                contraseña:bcrypt.hashSync(contraseña,10),
            },{
                where:{nombre_usuario}
            })
            res.send({status:0,msg:'Tu contraseña ha sido modificada exitosamente, ahora podrás iniciar sesión.'})
        }else{
            res.send({status:1,msg:'código incorrecto o vencido'})
        }
    }else{
        res.send({status:1,msg:'no existe el usuario introducido'})
    } 
})
module.exports = router