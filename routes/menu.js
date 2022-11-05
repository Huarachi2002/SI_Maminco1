const express = require('express')
const {Menu} = require('../models/menu')
const router = express.Router()

router.get('',async(req,res) =>{
    const fecha = new Date()
    try{
        const menu = await Menu.create({
            fecha
        })

    }catch(error){

    }
})

module.exports = router;