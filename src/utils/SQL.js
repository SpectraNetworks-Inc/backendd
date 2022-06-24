const config = require('../config/config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.postgresql.dbname, config.postgresql.user, config.postgresql.password, {
    dialect: 'postgres',
    application_name: 'backendd',
    host: config.postgresql.host,
});

module.exports = sequelize;