const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Producto = require("./producto");

exports.Menu = sequelize.define('menu',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    fecha:{
        type:DataTypes.DATE,
        allowNull:false
    },

},{
    tableName:'menu',
    timestamps:false
});

exports.ProductoMenu = sequelize.define('producto_menu',{
    
    id_menu:{
        type:DataTypes.INTEGER,
        references:{
            model:this.Menu,
            key:'id',
        }
    },
    codigo_producto:{
        type:DataTypes.INTEGER,
        references:{
            model:Producto,
            key:'codigo',
        }
    },
    cantidad:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }
},{
    tableName:'producto_menu',
    timestamps:false,
});

this.Menu.belongsToMany(Producto,{
    through:this.ProductoMenu,
    foreignKey:'id_menu'});
Producto.belongsToMany(this.Menu,{
    through:this.ProductoMenu,
    foreignKey:'codigo_producto'});