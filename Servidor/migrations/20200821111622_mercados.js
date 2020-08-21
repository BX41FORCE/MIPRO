const Knex = require("knex");

exports.up = function (knex) {
    return knex.schema.createTable('mercados', function (table) {
        table.increments('id_mercado').primary();
        table.string('nombre', 100).notNullable();
        table.string('longitud', 20).notNullable();
        table.string('latitud', 20).notNullable();
    })
};

exports.down = function (knex) {
return knex.schema.dropTable('mercados');
};