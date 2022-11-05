const express = require('express')
const {Usuario,TipoUsuario} = require('../models/usuario')
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const Persona = require('../models/persona');

const router = express.Router();

// obtener lista de usuario
router.get('',async (req,res) =>{
    try{
        const users = await Usuario.findAll({
            attributes:{exclude:['contraseña']},
            where:{
                [Op.not]:[
                    {id_tipo_usuario:1}
                ]
            },
            include:[{
                model:TipoUsuario,
                attributes:['descripcion'],
            },{
                model:Persona,
                attributes:['apellido_paterno','apellido_materno','nombres'],
            }]
        })
        res.send({status:0,data:users});
    }catch(error){
        res.send({status:1,msg:error})
    }    
})

// registrar usuario
router.post('/reg',async (req,res) =>{
    const {nombre_usuario, contraseña,id_tipo_usuario,id_persona} = req.body
 
    try{
        const user = await Usuario.findOne({
            // where nombre_usuario = nombre_usuario OR (tipo_usuario AND id_persona)
            where:{
                [Op.or]:[
                    {nombre_usuario},
                    {
                        id_tipo_usuario,
                        id_persona,
                    }
                ]
            }
        })
        // console.log(user);
        //si encuentra usuario, o una persona ya tiene un usuario del mismo tipo
        // enviar un mensaje, que cambie de nombre de usuario o de tipo usuario
        if(user){
            res.send({status:1,msg:'Ese nombre de usuario ya esta en uso o la persona ya esta registrada. Prueba otro.'})
        }else{
            await Usuario.create({
                nombre_usuario,
                contraseña:bcrypt.hashSync(contraseña,10),
                id_tipo_usuario,
                id_persona,
            })
            res.send({status:0,msg:'Se creo el usuario exitosamente'})
        }   
    }catch(error){
        console.log(error);
        res.send({status:1,msg:error})
    }
})

//eliminar definitivamente de la bd
router.get('/deleteUser/:nombre_usuario',async (req, res) =>{
    const {nombre_usuario} = req.params
    // console.log(codigo)
    try{
        const user = Usuario.findOne({
            where:{
                nombre_usuario,
            }
        })
        if(user){
            await Usuario.destroy({
                where:{
                    nombre_usuario,
                }
            })
            res.send({status:0,msg:'eliminado existosamente'})
        }else{
            res.send({status:1,msg:'no se encontro el usuario que desea eliminar'})
        }
                
    }catch(error){
        res.send({status:1,msg:error})
    }
})

//buscar usuario segun su nombre de usuario o nombres o apellidos
router.get('/search',async (req,res) =>{
    const {busqueda} = req.query
    let regex = `%${busqueda}%`
    // console.log(regex)
    try{
        const usersName = await Usuario.findAll({
            attributes:{exclude:['contraseña']},
            where:{
                [Op.not]:[
                        {id_tipo_usuario:1}
                ],
                nombre_usuario:{[Op.like]:regex},
                
            },
            include:[{
                model:TipoUsuario,
                attributes:{exclude:['id_tipo']},
            },{
                model:Persona,
                attributes:['apellido_paterno','apellido_materno','nombres'],
            }]
        })

        const users = await Usuario.findAll({
            attributes:{exclude:['contraseña']},
            where:{
                [Op.not]:[
                        {id_tipo_usuario:1}
                ],
            },
            include:[{
                model:TipoUsuario,
                attributes:{exclude:['id_tipo']},
            },{
                model:Persona,
                attributes:['apellido_paterno','apellido_materno','nombres'],
                where:{
                    [Op.or]:[
                        {nombres: {[Op.like]:regex}},
                        {apellido_paterno:{[Op.like]:regex}},
                        {apellido_materno:{[Op.like]:regex}},
                    ]
                },
            }]
        })
        const temp = [...usersName,...users]
        let hash = [];
        for (let i=0; i<temp.length; i++) {
            for (let j=i+1; j<temp.length; j++) {
                if (temp[i].nombre_usuario === temp[j].nombre_usuario) {
                    ++i;
                }
            }
            hash.push(temp[i]);
        }
        res.send({status:0,data:hash});
    }catch(error){
        res.send({status:1,msg:error})
    }
    
})

module.exports = router;
