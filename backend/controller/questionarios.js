const knex = require("../connection");

const ListarQuestionarios = async (req, res) => {
    try {
        const questionarios = await knex('questionarios');
        const questionariosComPerguntas = [];
        for (const questionario of questionarios) {
            questionario.perguntas = await knex('perguntas').where({ codigo_questionario: questionario.codigo })
            questionariosComPerguntas.push(questionario)
        }
        return res.status(200).json(questionariosComPerguntas);
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const CriarQuestionarios = async (req, res) => {
    const questionario = req.body;
    try {

        const perguntas = questionario.perguntas;
        const data = new Date();
        for (const pergunta of perguntas) {
            const codigoPerguntaExiste = await knex('perguntas').where({ cod_perg: pergunta.cod_perg });
            if (codigoPerguntaExiste.length > 0) {
                return res.status(400).json({ mensagem: "Código de pergunta já registrado!" })
            }
        }
        const questionarioCriado = await knex('questionarios').insert({ data, nome: questionario.nome, descricao: questionario.descricao }).returning('*');
        for (const pergunta of perguntas) {
            await knex('perguntas').insert({ codigo_questionario: questionarioCriado[0].codigo, descricao: pergunta.descricao, cod_perg: pergunta.cod_perg })
        }

        return res.status(200).json({ mensagem: "Questionário criado com sucesso!" })
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const AtualizarQuestionario = async (req, res) => {

    const { codigo } = req.params;
    const questionario = req.body;
    try {

        const questionarioValido = await knex('questionarios').where({ codigo });
        if (questionarioValido.length < 1) {
            return res.status(400).json({ mensagem: "Questionário não encontrado!" })
        }
        const atualizacoes = {};
        questionario.nome ? atualizacoes.nome = questionario.nome : '';
        questionario.descricao ? atualizacoes.descricao = questionario.descricao : '';

        if (questionario.perguntas) {
            for (const pergunta of questionario.perguntas) {
                const codigoPerguntaValida = await knex('perguntas').where({ cod_perg: pergunta.cod_perg });
                if (codigoPerguntaValida.length < 1) {
                    return res.status(400).json({ mensagem: "Código da pergunta inválida!" })
                }
            }
            for (const pergunta of questionario.perguntas) {
                await knex('perguntas').where({ cod_perg: pergunta.cod_perg }).update({ descricao: pergunta.descricao });
            }
        }
        await knex('questionarios').where({ codigo }).update(atualizacoes);


        return res.status(200).json({ mensagem: "Questionário atualizado com sucesso!" });
    } catch (error) {
        return res.status(500).json({ mensagem: error.mensage })
    }
}

const ExcluirQuestionario = async (req, res) => {
    const { codigo } = req.params;
    try {

        const questionarioValido = await knex('questionarios').where({ codigo });
        if (questionarioValido.length < 1) {
            return res.status(400).json({ mensagem: "Questionário não encontrado!" })
        }

        await knex('questionarios').where({ codigo }).del();
        return res.status(200).json({ mensagem: "Questionario excluído com sucesso!" });
    } catch (error) {
        return res.status(500).json({ mensagem: error.mensage });
    }
}

module.exports = {
    ListarQuestionarios,
    CriarQuestionarios,
    AtualizarQuestionario,
    ExcluirQuestionario
}