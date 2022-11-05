const express = require('express');
const { Op } = require('sequelize');
const sequelize = require('../database');
const Cliente = require('../models/cliente');
const Persona = require('../models/persona');
const { TipoUsuario } = require('../models/usuario');
const router = express.Router();

//obtener la lista de cliente
router.get('',async (req,res) =>{
    // console.log('get');
    try{
        const clients = await Cliente.findAll({
            // attributes:['nit'],
            include:[{
                model:Persona,
                attributes:{exclude:['id']},
            }]   
        })
        const roles = await TipoUsuario.findAll({
            where:{
                id_tipo:3
            }
        })
        // console.log(clients);
        res.send({status:0,data:{clients,roles}});
    }catch(error){
        console.log(error);
        res.send({status:1,msg:error})
    }
    
})

//registrar un cliente
router.post('/regClient',async(req,res) =>{
    // console.log(req.body);
    const {ci,apellido_paterno,apellido_materno,nombres,sexo,telefono,direccion,e_mail,fecha_nacimiento,nit} = req.body;
    const t = await sequelize.transaction()
    try{
        const person = await Persona.create({
            ci,apellido_paterno,apellido_materno,nombres,
            sexo,telefono,direccion,e_mail,fecha_nacimiento
        },{transaction: t })
        // console.log(person.id);
        if(person){
            await Cliente.create({
                id_cliente:person.id,
                nit,
            },{transaction: t })
            t.commit()
            res.send({status:0,msg:'cliente registrado exitosamente'})
        }
    }catch(error){
        console.log(error)
        t.rollback()
        res.send({status:1,msg:error})
    }
})

//modifica datos de un cliente
router.post('/updateClient',async(req,res) =>{
    const {id_cliente,ci,apellido_paterno,apellido_materno,nombres,sexo,telefono,direccion,e_mail,fecha_nacimiento,nit} = req.body;
    console.log(req.body);
    const t = await sequelize.transaction()
    try{
        // verifica si existe el cliente
        const client = await Cliente.findOne({
            where:{
                id_cliente,
            }
        })
        console.log('client')
        //en caso de que exista
        if(client){
            await Persona.update({
                ci,apellido_paterno,apellido_materno,nombres,
                sexo,telefono,direccion,e_mail,fecha_nacimiento
            },{
                where:{
                    id:id_cliente,
                }
            },{transaction:t})
            console.log('person')
            await Cliente.update({
                nit,
            },{
                where :{id_cliente}
            },{transaction:t})
            console.log('persona')
            t.commit()
            res.send({status:0,msg:' modificado con exito'})     
        }else{
            res.send({status:1,msg:'no existe el cliente'})
        }
            
    }catch(error){
        t.rollback()
        console.log(error)
        res.send({status:1,msg:error})
    }
})

//buscar informacion de un cliente segun sus nombres o apellidos
router.get('/search',async (req,res) =>{
    const {busqueda} = req.query
    let regex = `%${busqueda}%`
    // console.log(regex);
    try{
        const clients = await Cliente.findAll({
            attributes:['nit'],
            include:[{
                model: Persona,
                where:{
                    [Op.or]:[
                        {nombres: {[Op.like]:regex}},
                        {apellido_paterno:{[Op.like]:regex}},
                        {apellido_materno:{[Op.like]:regex}},
                    ]
                },
            }]   
        })
        
        res.send({status:0,data:clients});
    }catch(error){
        // console.log(error)
        res.send({status:1,msg:error})
    }
})
module.exports = router;