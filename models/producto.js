const { DataTypes } = require('sequelize');
const sequelize = require('../database/index')

const Producto = sequelize.define('producto',{
    codigo:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull:false,
        unique: true,
    },
    tipo:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            isAlpha:true,
        }
    },
    precio:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    eliminado:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: false,
    }
},{
    tableName:'producto',
    timestamps:false,
});

module.exports = Producto;