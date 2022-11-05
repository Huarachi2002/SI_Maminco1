const { DataTypes } = require('sequelize');
const sequelize = require('../database/index')
const Persona = require('./persona')

exports.Empleado = sequelize.define('empleado',{
    id_empleado:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        references:{
            model:Persona,
            key:'id',
        }
    },
    sueldo:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    hora_llegada:{
        type:DataTypes.TIME,
        allowNull:false,
    },
    hora_salida:{
        type:DataTypes.TIME,
        allowNull:false,
    },
    eliminado:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false,
    },
    tipo:{
        type:DataTypes.CHAR,
        allowNull:false,
    }
},{
    tableName:'empleado',
    timestamps:false,
});

exports.Administrativo = sequelize.define('administrativo',{
    id_administrativo:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        references:{
            model:this.Empleado,
            key:'id_empleado',
        }
    },
    codigo:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }  
},{
    tableName:'administrativo',
    timestamps:false,
});

exports.Mesero = sequelize.define('mesero',{
    id_mesero:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        references:{
            model:this.Empleado,
            key:'id_empleado',
        }
    },
    nro:{
        type:DataTypes.INTEGER,
        unique:true,
        allowNull:false,
    },
    
},{
    tableName:'mesero',
    timestamps:false,
});

exports.Cocinero = sequelize.define('cocinero',{
    id_cocinero:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        references:{
            model:this.Empleado,
            key:'id_empleado',
        }
    },
    puesto:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    
},{
    tableName:'cocinero',
    timestamps:false,
});

Persona.hasOne(this.Empleado,{
    foreignKey:'id_empleado'
});
this.Empleado.belongsTo(Persona,{
    foreignKey:'id_empleado'
});

this.Empleado.hasOne(this.Administrativo,{
    foreignKey:'id_administrativo'
});
this.Administrativo.belongsTo(this.Empleado,{
    foreignKey:'id_administrativo'
});

this.Empleado.hasOne(this.Mesero,{
    foreignKey:'id_mesero'
});
this.Mesero.belongsTo(this.Empleado,{
    foreignKey:'id_mesero'
});

this.Empleado.hasOne(this.Cocinero,{
    foreignKey:'id_cocinero'
});
this.Cocinero.belongsTo(this.Empleado,{
    foreignKey:'id_cocinero'
});
