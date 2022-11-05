const express = require('express')
const { Op } = require('sequelize')
const { TipoUsuario } = require('../models/usuario')


const router = express.Router()

//obtener todos los tipos de usuarios menos admin y cliente
router.get('', async(req,res)=>{
    try{
        const roles = await TipoUsuario.findAll({
            where:{
                [Op.not]:[{id_tipo:[1,3]}]
            }
        })
        if(roles){
            res.send({status:0,data:roles})
        }else{
            res.send({status:0,msg:'No se pudo obtener la lista de tipos de usuario'})
        }
    }catch(error){
        res.send({status:1,msg:error})
    }
})

// crear un nuevo tipo de usuario
router.post('/addRole', async(req,res)=>{
    const {descripcion} = req.body
    // console.log(descripcion)
    try{
        const rol = await TipoUsuario.create({
            descripcion
        })
        if(rol){
            res.send({status:0,data:rol})
        }else{
            res.send({status:1,msg:'No se pudo crear el tipo de usuario introducido'})
        }
    }catch(error){
        res.send({status:1,msg:error})
    }
})

//modificar permisos de usuario
router.post('/updateRole', async(req,res)=>{
    const {id_tipo,menu} = req.body
    try{
        const rol = await TipoUsuario.findOne({
            where:{id_tipo}
        })
        if(rol){
            const tipo = await TipoUsuario.update({
                menu
            },{
                where:{id_tipo,}
            })
            if(tipo == 1){
                res.send({status:0,msg:'permisos actualizados exitosamente'})   
            }else{
                res.send({status:1,msg:'No se pudo actualizar permisos asignados'})
            }
             
        }else{
            res.send({status:1,msg:'no existe este tipo de usuario'})
        }
    }catch(error){
        console.log(error)
        res.send({status:1,msg:error})
    }
})
module.exports = router