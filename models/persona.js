const { DataTypes } = require('sequelize');
const sequelize = require('../database/index')

const Persona = sequelize.define('Persona',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    ci: DataTypes.INTEGER,
    
    apellido_paterno:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    apellido_materno: DataTypes.STRING,
    nombres:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    sexo:{
        type:DataTypes.CHAR,
        allowNull:false,
    },
    telefono:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },

    direccion:DataTypes.STRING,

    e_mail:{
        type:DataTypes.STRING,
        validate:{
            isEmail:true,
        }
    },
    fecha_nacimiento:{
        type:DataTypes.DATE,
        allowNull:false,
        validate:{
            isBefore:DataTypes.NOW,
        }
    },
},{
    tableName:'persona',
    timestamps:false,
});

module.exports = Persona;