const express = require('express')
const bcrypt = require('bcryptjs')
const Persona = require('../models/persona')
const { Usuario } = require('../models/usuario')

const router = express.Router()

router.get('/info',async(req,res) => {
    const {id_persona} = req.query
    const id = parseInt(id_persona)
    try{
        const person = await Persona.findByPk(id)
        res.send({status:0,data:person})
    }catch(error){
        console.log(error)
        res.send({status:1,msg:error})
    }
})

router.post('/updateInfo', async(req, res) =>{
    const {id,ci,apellido_paterno,apellido_materno,nombres,sexo,telefono,direccion,e_mail,fecha_nacimiento} = req.body;
    try{
        const person = await Persona.update({
            ci,apellido_paterno,apellido_materno,nombres,
            sexo,telefono,direccion,e_mail,fecha_nacimiento
        },{where:{id}})
        // console.log(person.id);
        if(person == 1){
            res.send({status:0,msg:'datos modificados exitosamente'})
        }else{
            res.send({status:0,msg:'error al modificar datos'})
        }
    }catch(error){
        console.log(error)
        res.send({status:1,msg:error})
    }
})

router.post('/changePwd', async(req, res) => {
    const {nombre_usuario, contraseña, nuevaContraseña} = req.body
    console.log('changepwed')
    try{
        const user = await Usuario.findByPk(nombre_usuario)
        
        const result = bcrypt.compareSync(contraseña,user.contraseña);
        console.log(result)
        if(!result) return res.send({status:1,msg:'contraseña incorrecta'})
        
        const suc =  await Usuario.update({
            contraseña:bcrypt.hashSync(nuevaContraseña,10),
        },{
            where:{nombre_usuario}
        })
        
        if(suc == 1){
            res.send({status:0,msg:'Tu contraseña ha sido modificada exitosamente.'})
        }else{
            res.send({status:1,msg:'Error al cambiar contraseña.'})
        }

    }catch(error){
        console.log(error)
        res.send({status:1,msg:error})
    }
})

module.exports = router;