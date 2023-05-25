const knex = require("../connection");
const bcrypt = require('bcrypt');

const Logar = async (req, res) => {
    const { usuario } = req.body;
    try {
        const usuarioLogado = await knex('usuarios').where({ cpf: usuario.cpf });

        if (usuarioLogado.length < 1) {
            return res.status(400).json({ mensagem: "CPF e/ou senha inválido(s)." });
        }

        const senhaCorreta = await bcrypt.compare(usuario.senha, usuarioLogado[0].senha);

        if (!senhaCorreta) {
            return res.status(400).json({ mensagem: "CPF e/ou senha inválido(s)." });
        }

        return res.status(200).json({
            mensagem: "Usuario logado com sucesso!",
            codigo: usuarioLogado[0].codigo
        })
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const ListarUsuarios = async (req, res) => {

    try {
        const usuarios = await knex('usuarios');
        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const CriarUsuario = async (req, res) => {
    const atributos = req.body;
    try {
        if (await verificarCpf(atributos.cpf)) {
            return res.status(400).json({ mensagem: "CPF já registrado!" })
        }
        atributos.senha = await bcrypt.hash(atributos.senha.toString(), 10);
        await knex('usuarios').insert(atributos);
        return res.status(200).json()
    } catch (error) {
        return res.status(400).json(error.message)
    }
}

const AtualizarUsuario = async (req, res) => {

    const { codigo } = req.params;
    const atributos = req.body;

    try {

        if (atributos.cpf) {
            if (await verificarCpf(atributos.cpf, codigo)) {
                return res.status(400).json({ mensagem: "CPF já cadastrado." });
            }
        }
        if (atributos.senha) {
            atributos.senha = await bcrypt.hash(atributos.senha.toString(), 10);
        }

        const usuarioAtualizado = await knex('usuarios').where({ codigo }).update(atributos).returning("*");

        return res.status(200).json(usuarioAtualizado);
    } catch (error) {
        return res.status(500).json({ mensagem: error.mensage })
    }
}

const ExcluirUsuario = async (req, res) => {
    const { codigo } = req.params;

    try {
        await knex('usuarios').where({ codigo }).del();
        return res.status(200).json({ mensagem: "Usuário excluído com sucesso!" });
    } catch (error) {
        return res.status(500).json({ mensagem: error.mensage });
    }
}

const verificarCpf = async (cpf, codigo) => {

    const cpfRegistrado = await knex('usuarios')
        .where((qb) => {
            if (codigo) {
                qb.where("codigo", "<>", codigo)
            }

        })
        .where({ cpf });
    return cpfRegistrado.length > 0;
};

module.exports = {
    Logar,
    ListarUsuarios,
    CriarUsuario,
    AtualizarUsuario,
    ExcluirUsuario
}