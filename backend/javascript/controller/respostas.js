const knex = require("../connection");
const bcrypt = require('bcrypt');

const ListarRespostas = async (req, res) => {
    const { codigo } = req.params;
    const paginacao = req.query.paginacao || 1;
    try {

        if (await validarQuestionario(codigo)) {
            return res.status(400).json({ mensagem: "Questionário não encontrado!" })
        }

        const respostas = await knex.select('perguntas.descricao AS pergunta', 'respostas.descricao AS resposta', 'respostas.codigo as resposta_codigo')
            .from('respostas')
            .join('perguntas', 'respostas.perg_cod', '=', 'perguntas.cod_perg')
            .join('questionarios', 'perguntas.codigo_questionario', '=', 'questionarios.codigo')
            .where('questionarios.codigo', '=', codigo)
            .offset((paginacao - 1) * 10)
            .limit(10)
        return res.status(200).json(respostas);
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const EnviarRespostas = async (req, res) => {
    const { codigo } = req.params;
    const { usuario, respostas } = req.body;
    try {

        if (await validarUsuario(usuario) || !(usuario.cpf && usuario.senha)) {
            return res.status(400).json({ mensagem: "CPF e/ou senha inválido(s)." });
        }
        if (await validarQuestionario(codigo)) {
            return res.status(400).json({ mensagem: "Questionário não encontrado!" });
        }

        for (const resposta of respostas) {
            const perguntaExiste = await knex('perguntas').where({ cod_perg: resposta.perg_cod });
            if (perguntaExiste.length < 1) {
                return res.status(400).json({ mensagem: `Código de pergunta ${resposta.perg_cod} não encontrado!` });
            }
        }
        const data = new Date();
        for (const resposta of respostas) {
            const usuarioResposta = await knex('usuario_resposta').insert({ codigo_usuario: usuario.codigo, codigo_questionario: codigo, data }).returning('*');
            await knex('respostas').insert({ descricao: resposta.descricao, perg_cod: resposta.perg_cod, usuario_resposta_codigo: usuarioResposta[0].codigo })
        }

        return res.status(200).json({ mensagem: "Respostas enviadas com sucesso!" });
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const AtualizarResposta = async (req, res) => {

    const { codigo, codigoResposta } = req.params;
    const { descricao } = req.body;

    try {
        if (!descricao) {
            return res.status(400).json({ mensagem: "Descrição da resposta obrigatória!" })
        }

        if (await validarQuestionario(codigo)) {
            return res.status(400).json({ mensagem: "Questionário não encontrado!" })
        }

        if (await validarResposta(codigoResposta)) {
            return res.status(400).json({ mensagem: `Resposta não encontrada!` })
        }

        await knex('respostas').where({ codigo: codigoResposta }).update({ descricao });

        return res.status(200).json({ mensagem: "Resposta atualizada com sucesso!" });
    } catch (error) {
        return res.status(500).json({ mensagem: error.mensage })
    }
}

const ExcluirResposta = async (req, res) => {
    const { codigo, codigoResposta } = req.params;
    try {

        if (await validarQuestionario(codigo)) {
            return res.status(400).json({ mensagem: "Questionário não encontrado!" })
        }
        if (await validarResposta(codigoResposta)) {
            return res.status(400).json({ mensagem: `Resposta não encontrada!` })
        }

        await knex('respostas').where({ codigo: codigoResposta }).del();
        return res.status(200).json({ mensagem: "Resposta excluída com sucesso!" });
    } catch (error) {
        return res.status(500).json({ mensagem: error.mensage });
    }
}

const validarQuestionario = async (codigo) => {
    const questionarioValido = await knex('questionarios').where({ codigo });
    if (questionarioValido.length < 1) {
        return true;
    }
    return false;
}

const validarResposta = async (codigo) => {
    const respostaExiste = await knex('respostas').where({ codigo });
    if (respostaExiste.length < 1) {
        return true;
    }
    return false;
}

const validarUsuario = async (usuario) => {
    try {
        const usuarioLogado = await knex('usuarios').where({ cpf: usuario.cpf });

        if (usuarioLogado.length < 1) {
            return true;
        }

        const senhaCorreta = await bcrypt.compare(usuario.senha, usuarioLogado[0].senha);
        if (!senhaCorreta) {
            return true;
        }

        usuario.codigo = usuarioLogado[0].codigo;
        return false;
    } catch (error) {
        return true;
    }
}

module.exports = {
    ListarRespostas,
    EnviarRespostas,
    AtualizarResposta,
    ExcluirResposta
}