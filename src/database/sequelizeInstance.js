const config = require('../config/databaseConfig.json')['development'];

const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    port: config.port,
    host: config.host,
    dialect: config.dialect
  }
);

module.exports = sequelize;