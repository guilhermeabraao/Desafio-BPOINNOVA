const joi = require('joi');

const respostaSchema = joi.object({
    usuario: joi.string().required(),
    respostas: joi.array().items({
        descricao: joi.string().required(),
        perg_cod: joi.string().required()
    }).required()
})

module.exports = respostaSchema;