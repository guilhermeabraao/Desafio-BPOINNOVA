const joi = require('joi');

const respostaSchema = joi.object({
    usuario: joi.object({
        senha: joi.string().required(),
        cpf: joi.string().min(11).max(11).required()
    }),
    respostas: joi.array().items({
        descricao: joi.string().required(),
        perg_cod: joi.string().required()
    }).required()
})

module.exports = respostaSchema;