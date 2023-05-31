import { Injectable } from '@nestjs/common';
import { CreateQuestionarioDto } from './dto/create-questionario.dto';
import { UpdateQuestionarioDto } from './dto/update-questionario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Questionarios } from './entities/questionarios.entity';
import { Repository } from 'typeorm';
import { Perguntas } from './entities/perguntas.entity';
import { format } from 'date-fns';

@Injectable()
export class QuestionariosService {

  constructor(@InjectRepository(Questionarios) private readonly questionarioRepository: Repository<Questionarios>,
    @InjectRepository(Perguntas) private readonly perguntaRepository: Repository<Perguntas>) { }

  async create(createQuestionarioDto: CreateQuestionarioDto) {
    const questionario = createQuestionarioDto;
    const perguntas = createQuestionarioDto.perguntas;
    for (const pergunta of perguntas) {
      const codigoPerguntaExiste = await this.perguntaRepository.findOne({ where: { cod_perg: pergunta.cod_perg } });

      if (codigoPerguntaExiste) {
        return { mensagem: "Código de pergunta já registrado!" };
      }
    }
    const questionarioCriado = await this.questionarioRepository.save({ nome: questionario.nome, descricao: questionario.descricao });
    for (const pergunta of perguntas) {
      await this.perguntaRepository.save({ codigo_questionario: questionarioCriado.codigo, descricao: pergunta.descricao, cod_perg: pergunta.cod_perg });
    }
    return { mensagem: "Questionário criado com sucesso!" };
  }

  async findAll(req) {
    const paginacao: any = req.query.paginacao || 1;

    const questionariosComPerguntas = { questionarios: [], totalQuestionarios: 0 };
    questionariosComPerguntas.totalQuestionarios = (await this.questionarioRepository.find()).length;
    const questionarios = await this.questionarioRepository.find({
      relations: ['perguntas'],
      skip: (paginacao - 1) * 10,
      take: 10,
    });
    questionarios.forEach((questionario) => {
      questionario.data = format(new Date(questionario.data), 'dd/MM/yyyy');
    });
    questionariosComPerguntas.questionarios = questionarios;
    return questionariosComPerguntas;
  }


  async updatePut(codigo: number, updateQuestionarioDto: UpdateQuestionarioDto) {
    const questionarioValido = await this.questionarioRepository.find({ where: { codigo } });
    if (questionarioValido.length < 1) {
      return { mensagem: "Questionário não encontrado!" };
    }

    const atualizacoes = {};
    updateQuestionarioDto.nome ? (atualizacoes.nome = updateQuestionarioDto.nome) : "";
    updateQuestionarioDto.descricao
      ? (atualizacoes.descricao = updateQuestionarioDto.descricao)
      : "";

    if (updateQuestionarioDto.perguntas) {
      for (const pergunta of updateQuestionarioDto.perguntas) {
        const codigoPerguntaValida = await this.perguntaRepository.find({ where: { cod_perg: pergunta.cod_perg } });
        if (codigoPerguntaValida.length < 1) {
          return { mensagem: "Código da pergunta inválida!" };
        }
      }
      for (const pergunta of updateQuestionarioDto.perguntas) {
        await this.perguntaRepository.update({ cod_perg: pergunta.cod_perg }, { descricao: pergunta.descricao });
      }
    }
    await this.questionarioRepository.update({ codigo }, atualizacoes);

    return { mensagem: "Questionário atualizado com sucesso!" };
  }

  async updatePatch(codigo: number, updateQuestionarioDto: UpdateQuestionarioDto) {
    const questionarioValido = await this.questionarioRepository.find({ where: { codigo } });
    if (questionarioValido.length < 1) {
      return { mensagem: "Questionário não encontrado!" };
    }

    const atualizacoes = { nome: '', descricao: '' };
    updateQuestionarioDto.nome ? (atualizacoes.nome = updateQuestionarioDto.nome) : "";
    updateQuestionarioDto.descricao
      ? (atualizacoes.descricao = updateQuestionarioDto.descricao)
      : "";

    if (updateQuestionarioDto.perguntas) {
      for (const pergunta of updateQuestionarioDto.perguntas) {
        const codigoPerguntaValida = await this.perguntaRepository.find({ where: { cod_perg: pergunta.cod_perg } });
        if (codigoPerguntaValida.length < 1) {
          return { mensagem: "Código da pergunta inválida!" };
        }
      }
      for (const pergunta of updateQuestionarioDto.perguntas) {
        await this.perguntaRepository.update({ cod_perg: pergunta.cod_perg }, { descricao: pergunta.descricao });
      }
    }
    await this.questionarioRepository.update({ codigo }, atualizacoes);

    return { mensagem: "Questionário atualizado com sucesso!" };
  }

  async remove(codigo: number) {
    await this.questionarioRepository.delete({ codigo })
    return { mensagem: 'questionario excluído!' };
  }
}
