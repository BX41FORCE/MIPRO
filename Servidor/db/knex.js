const enviroment = process.env.NODE_ENV || 'develoment';
const config = require('../knexfile');
const enviromentConfig = config[enviroment];
const knex = require('knex')('production');
const connection = knex(enviromentConfig);

module.exports = connection;
