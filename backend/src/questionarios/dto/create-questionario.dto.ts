import { Perguntas } from "../entities/perguntas.entity"

export class CreateQuestionarioDto {
    data: string
    nome: string
    descricao: string
    perguntas: Perguntas[]
}
