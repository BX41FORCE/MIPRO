const mercados = require('../mercados');

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('mercados').del()
    .then(function () {
      // Inserts seed entries
      return knex('mercados').insert(mercados);
    });
};
