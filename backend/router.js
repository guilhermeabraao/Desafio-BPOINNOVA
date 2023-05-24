const express = require('express');
const rotas = express();
const { ListarUsuarios, CriarUsuario, AtualizarUsuario, ExcluirUsuario } = require('./controller/usuarios');
const validacaoSchema = require('./middlewares/validacaoSchema');
const usuarioSchema = require('./schemas/usuarioSchema');

rotas.get('/usuarios', ListarUsuarios);
rotas.post('/usuario', validacaoSchema(usuarioSchema), CriarUsuario)
rotas.put('/usuario/:codigo', validacaoSchema(usuarioSchema), AtualizarUsuario)
rotas.patch('/usuario/:codigo', AtualizarUsuario)
rotas.delete('/usuario/:codigo', ExcluirUsuario)

module.exports = rotas;