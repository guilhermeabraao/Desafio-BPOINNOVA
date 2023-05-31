import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionarioDto } from './create-questionario.dto';
import { Perguntas } from '../entities/perguntas.entity';

export class UpdateQuestionarioDto extends PartialType(CreateQuestionarioDto) {
    data: string
    nome: string
    descricao: string
    perguntas: Perguntas[]
}
