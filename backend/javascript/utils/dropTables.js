require('dotenv').config();
const knex = require('../connection');
const knexSchema = require('../schemas/knexSchema');

(async () => {
    await knexSchema.down(knex);
    return console.log('Tabelas excluídas!');
})();