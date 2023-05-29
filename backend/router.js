const express = require('express');
const rotas = express();
const { ListarUsuarios, CriarUsuario, AtualizarUsuario, ExcluirUsuario } = require('./controller/usuarios');
const validacaoSchema = require('./middlewares/validacaoSchema');
const usuarioSchema = require('./schemas/usuarioSchema');
const { CriarQuestionarios, ListarQuestionarios, AtualizarQuestionario, ExcluirQuestionario } = require('./controller/questionarios');
const questionarioSchema = require('./schemas/questionarioSchema');
const { ListarRespostas, EnviarRespostas, AtualizarResposta, ExcluirResposta } = require('./controller/respostas');
const respostaSchema = require('./schemas/respostaSchema');


rotas.get('/usuarios', ListarUsuarios);
rotas.post('/usuario', validacaoSchema(usuarioSchema), CriarUsuario)
rotas.put('/usuario/:codigo', validacaoSchema(usuarioSchema), AtualizarUsuario)
rotas.patch('/usuario/:codigo', AtualizarUsuario)
rotas.delete('/usuario/:codigo', ExcluirUsuario)

rotas.get('/questionarios', ListarQuestionarios);
rotas.post('/questionarios', validacaoSchema(questionarioSchema), CriarQuestionarios);
rotas.put('/questionario/:codigo', validacaoSchema(questionarioSchema), AtualizarQuestionario);
rotas.patch('/questionario/:codigo', AtualizarQuestionario);
rotas.delete('/questionario/:codigo', ExcluirQuestionario);

rotas.get('/questionario/:codigo/respostas', ListarRespostas);
rotas.post('/questionario/:codigo/respostas', validacaoSchema(respostaSchema), EnviarRespostas);
rotas.put('/questionario/:codigo/respostas/:codigoResposta', AtualizarResposta);
rotas.delete('/questionario/:codigo/respostas/:codigoResposta', ExcluirResposta);

module.exports = rotas;