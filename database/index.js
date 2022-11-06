const { Sequelize} = require('sequelize');

const sequelize = new Sequelize('restaurante', 'postgres', 'plusultra2002', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;