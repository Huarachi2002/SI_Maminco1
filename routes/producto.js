const express = require('express');
const { Op } = require('sequelize');
const Producto = require('../models/producto');

const router = express.Router();

//obtener la lista de producto
router.get('',async (req,res) =>{
    try{
        const products = await Producto.findAll({
            attributes:{exclude:['eliminado']},
            where:{eliminado:false}
        })
        res.send({status:0,data:products});
    }catch(error){
        res.send({status:1,msg:error})
    }
    
})

//eliminar un producto ===> set eliminado = true
router.get('/deleteProduct/:codigo',async (req, res) =>{
    const {codigo} = req.params
    // console.log(codigo)
    try{
        const product = await Producto.findOne({
            where:{
                codigo,
                eliminado:false,
            }
        })
        // console.log(product);
        if(product){
            await Producto.update({eliminado:true},{
                where:{
                    codigo,
                }
            })
            res.send({status:0,msg:'eliminado existosamente'})
        }else{
            res.send({status:1,msg:'no se encontro el producto que desea eliminar'})
        }
            
    }catch(error){
        res.send({status:1,msg:error})
    }
})

//anadir un producto
router.post('/addProduct',async(req,res) =>{
    const {nombre,tipo,precio} = req.body;
    try{
        const product = await Producto.findOne({
            where:{
                nombre
            }
        })
        // console.log(product);
        if(product){
            res.send({status:1,msg:'ya existe el producto'})
        }else{
            await Producto.create({
                nombre,
                tipo,
                precio
            })
            res.send({status:0,msg:'producto anadido exitosamente'})
        }
            
    }catch(error){
        res.send({status:1,msg:error})
    }
})

//modifica datos de un producto
router.post('/updateProduct',async(req,res) =>{
    const {codigo,nombre,tipo,precio} = req.body;
    try{
        // verifica si existe el producto
        const product = await Producto.findOne({
            where:{
                codigo
            }
        })
        //en caso de que exista
        if(product){
            await Producto.update({
                nombre,
                tipo,
                precio,
            },{
                where:{
                    codigo,
                }
            })
            res.send({status:0,msg:'producto modificado con exito'})    
        }else{
            res.send({status:1,msg:'no existe el producto'})
        }
            
    }catch(error){
        console.log(error);
        res.send({status:1,msg:'el nombre de producto esta duplicado'})
    }
})

//buscar informacion de un producto segun su nombre
router.get('/search',async (req,res) =>{
    // console.log('serarch');
    const {busqueda} = req.query
    let regex = `%${busqueda}%`
    // console.log(regex);
    try{
        const products = await Producto.findAll({
            attributes:{exclude:['eliminado']},
            where:{
                eliminado:false,
                nombre: {[Op.like]:regex},
            }
        })
        // console.log(products);
        res.send({status:0,data:products});
    }catch(error){
        console.log(error)
        res.send({status:1,msg:error})
    }
})
module.exports = router;