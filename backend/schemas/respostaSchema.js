const joi = require('joi');

const respostaSchema = joi.object({
    respostas: joi.array().items({
        descricao: joi.string().required(),
        perg_cod: joi.string().required()
    }).required()
})

module.exports = respostaSchema;