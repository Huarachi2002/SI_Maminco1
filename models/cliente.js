const { DataTypes } = require('sequelize');
const sequelize = require('../database/index')
const Persona = require('./persona')

const Cliente = sequelize.define('cliente',{
    id_cliente:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        references:{
            model:Persona,
            key:'id',
        }
    },
    nit:DataTypes.STRING,
    
},{
    tableName:'cliente',
    timestamps:false,
});

Persona.hasOne(Cliente,{
    foreignKey:'id_cliente'
});
Cliente.belongsTo(Persona,{
    foreignKey:'id_cliente'
});
module.exports = Cliente;