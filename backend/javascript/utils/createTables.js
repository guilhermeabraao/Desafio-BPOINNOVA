require('dotenv').config();
const knex = require('../connection');
const knexSchema = require('../schemas/knexSchema');

(async () => {
    await knexSchema.up(knex);
    return console.log('Tabelas criadas!');
})();