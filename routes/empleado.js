const express = require('express');
const { Op } = require('sequelize');
const sequelize = require('../database');
const {Empleado,Mesero,Cocinero, Administrativo} = require('../models/empleado');
const Persona = require('../models/persona');
const { TipoUsuario } = require('../models/usuario');
const router = express.Router();

//obtener la lista de empleados
router.get('',async (req,res) =>{
    // console.log('get');
    try{
        const mesero = await Mesero.findAll({
            attributes:[['id_mesero','id'],'nro'],
            include:{
                model: Empleado,
                attributes:{exclude:['id_empleado','eliminado']},
                where:{eliminado:false},
                include:[{
                    model:Persona,
                    attributes:{exclude:['id']},
                }]
            }  
        })
        const cocinero = await Cocinero.findAll({
            attributes:[['id_cocinero','id'],'puesto'],
            include:{
                model: Empleado,
                attributes:{exclude:['id_empleado','eliminado']},
                where:{eliminado:false},
                include:[{
                    model:Persona,
                    attributes:{exclude:['id']},
                }]
            }  
        })
        const admin = await Administrativo.findAll({
            attributes:[['id_administrativo','id'],'codigo'],
            where:{
                [Op.not]:[{'id_administrativo':[1]}]
            },
            include:{
                model: Empleado,
                attributes:{exclude:['id_empleado','eliminado']},
                where:{eliminado:false},
                include:[{
                    model:Persona,
                    attributes:{exclude:['id']},
                }]
            }  
        })
        // console.log(admin)
        const roles = await TipoUsuario.findAll({
            where:{
                [Op.not]:[{id_tipo:[1,3]}]
            }
        })
        const emp = [...admin,...mesero, ...cocinero]
        res.send({status:0,data:{emp,roles}});
    }catch(error){
        // console.log('error');
        console.log(error);
        res.send({status:1,msg:error})
    }    
})

//registrar un empleado
router.post('/regEmployee',async(req,res) =>{
    const {ci,apellido_paterno,apellido_materno,nombres,sexo,telefono,direccion,e_mail,fecha_nacimiento,tipo} = req.body;
    const result = req.body;
    const t = await sequelize.transaction();
    try{
        const person = await Persona.create({
            ci,apellido_paterno,apellido_materno,nombres,
            sexo,telefono,direccion,e_mail,fecha_nacimiento
        },{transaction: t })
        // console.log(person);
        const employee = await Empleado.create({
            id_empleado:person.id,
            sueldo:result.sueldo,
            hora_llegada:result.hora_llegada,
            hora_salida:result.hora_salida,
        },{transaction: t})
        // console.log(employee);
        if(employee){
            if(tipo === 'C'){
                await Cocinero.create({
                    id_cocinero:person.id,
                    puesto: result.puesto,
                },{transaction: t })
            }else if(tipo === 'M'){
                await Mesero.create({
                    id_mesero:person.id,
                    nro: result.nro,
                },{transaction: t })
            }
            t.commit();
            res.send({status:0,msg:'empleado registrado exitosamente'})
        }
    }catch(error){
        t.rollback();
        res.send({status:1,msg:error})
    }
})

//modifica datos de un empleado
router.post('/updateEmployee',async(req,res) =>{
    const {id,ci,apellido_paterno,apellido_materno,nombres,sexo,telefono,direccion,e_mail,fecha_nacimiento,tipo} = req.body;
    const result = req.body
    const t = await sequelize.transaction()
    try{
        // verifica si existe el empleado
        const employee = await Empleado.findOne({
            where:{
                id_empleado:id,
            }
        },{transaction: t })
        
        //en caso de que exista
        if(employee){
            await Persona.update({
                ci,apellido_paterno,apellido_materno,nombres,
                sexo,telefono,direccion,e_mail,fecha_nacimiento
            },{
                where:{
                    id,
                }
            },{transaction: t })

            await Empleado.update({
                id_empleado:id,
                sueldo:result.sueldo,
                hora_llegada:result.hora_llegada,
                hora_salida:result.hora_salida,
            },{
                where :{id_empleado:id}
            },{transaction: t })
            
            if(tipo === 'C'){
                await Cocinero.update({
                    id_cocinero:id,
                    puesto: result.puesto,
                },{
                    where:{id_cocinero:id}
                },{transaction: t })
            }else if(tipo === 'M'){
                await Mesero.update({
                    id_mesero:id,
                    nro: result.nro,
                },{
                    where:{id_mesero:id}
                },{transaction: t })
            }
            t.commit();
            res.send({status:0,msg:' modificado con exito'})     
        }else{
            res.send({status:1,msg:'no existe el empleado'})
        }
            
    }catch(error){
        t.rollback();
        console.log(error)
        res.send({status:1,msg:error})
    }
})

//eliminar un empleado si se despide
router.get('/deleteEmployee/:id_empleado',async (req, res) =>{
    const {id_empleado} = req.params
    // console.log(id)
    try{
        const employee = await Empleado.findOne({
            where:{
                id_empleado,
                eliminado:false,
            }
        })
       
        if(employee){
            await Empleado.update({eliminado:true},{
                where:{
                    id_empleado,
                }
            })
            res.send({status:0,msg:'eliminado existosamente'})
        }else{
            res.send({status:1,msg:'no se encontro el empleado que desea eliminar'})
        }
            
    }catch(error){
        res.send({status:1,msg:error})
    }
})

//buscar informacion de un empleado segun sus nombres y apellidos
router.get('/search',async (req,res) =>{
    const {busqueda} = req.query
    let regex = `%${busqueda}%`
    try{
        const mesero = await Mesero.findAll({
            attributes:[['id_mesero','id'],'nro'],
            include:{
                model: Empleado,
                attributes:{exclude:['id_empleado','eliminado']},
                where:{eliminado:false},
                include:[{
                    model:Persona,
                    attributes:{exclude:['id']},
                    where:{
                        [Op.or]:[
                            {nombres: {[Op.like]:regex}},
                            {apellido_paterno:{[Op.like]:regex}},
                            {apellido_materno:{[Op.like]:regex}},
                        ]
                    },
                }]
            }  
        })
        const cocinero = await Cocinero.findAll({
            attributes:[['id_cocinero','id'],'puesto'],
            include:{
                model: Empleado,
                attributes:{exclude:['id_empleado','eliminado']},
                where:{eliminado:false},
                include:[{
                    model:Persona,
                    attributes:{exclude:['id']},
                    where:{
                        [Op.or]:[
                            {nombres: {[Op.like]:regex}},
                            {apellido_paterno:{[Op.like]:regex}},
                            {apellido_materno:{[Op.like]:regex}},
                        ]
                    },
                }]
            }  
        })
        res.send({status:0,data:[...mesero,...cocinero]});
    }catch(error){
        res.send({status:1,msg:error})
    }
})
module.exports = router;