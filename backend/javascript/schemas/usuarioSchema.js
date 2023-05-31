const joi = require('joi');

const usuarioSchema = joi.object({
    nome: joi.string().min(3).required(),
    senha: joi.string().required(),
    cpf: joi.string().min(11).max(11).required()
})

module.exports = usuarioSchema;