const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../database/index')
const Persona = require('./persona')

exports.TipoUsuario = sequelize.define('tipo_Usuario',{
    id_tipo:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    descripcion:{
        type:DataTypes.STRING,
        allowNull:false,
    },  
    menu:DataTypes.ARRAY(DataTypes.STRING),
},{
    tableName:'tipo_usuario',
    timestamps:false,
});

exports.Usuario = sequelize.define('usuario',{
    nombre_usuario:{
        type:DataTypes.STRING,
        primaryKey:true,
        validate:{
            is: /^[a-zA-Z0-9]+$/i, 
        }
    },
    contraseña:{
        type:DataTypes.STRING,
        allowNull:false,
        // validate:{
        //     is: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,30}$/i, 
        // }
    },
    fec_hora:DataTypes.DATE,
    cod_verificacion:DataTypes.STRING,

    id_tipo_usuario:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:this.TipoUsuario,
            key:'id_tipo',
        }
    },
    id_persona:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Persona,
            key:'id',
        }
    },
    
},{
    tableName:'usuario',
    timestamps:false,
});

this.TipoUsuario.hasMany(this.Usuario,{
    foreignKey:'id_tipo_usuario'
});
this.Usuario.belongsTo(this.TipoUsuario,{
    foreignKey:'id_tipo_usuario'
});

Persona.hasMany(this.Usuario,{
    foreignKey:'id_persona',
})
this.Usuario.belongsTo(Persona,{
    foreignKey:'id_persona',
})