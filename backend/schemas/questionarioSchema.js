const joi = require('joi');

const questionarioSchema = joi.object({
    nome: joi.string().min(3).required(),
    descricao: joi.string().required(),
    perguntas: joi.array().items({
        descricao: joi.string().required(),
        cod_perg: joi.string().required()
    }).required()
})

module.exports = questionarioSchema;