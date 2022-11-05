const { DataTypes } = require('sequelize');
const sequelize = require('../database/index')

const Mesa = sequelize.define('mesa',{
    nro:{
        type:DataTypes.INTEGER,
        primaryKey:true,
    },
    ubicacion:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    cantidad_cliente:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    disponible:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
    },
},{
    tableName:'mesa',
    timestamps:false,
});

module.exports = Mesa;