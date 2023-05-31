import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Perguntas } from "./perguntas.entity";
// import { Usuario_respostas } from "src/respostas/entities/usuario_respostas.entity";

@Entity()
export class Questionarios {
    @PrimaryGeneratedColumn()
    codigo: number

    @Column()
    data: string

    @Column()
    nome: string

    @Column()
    descricao: string

    @OneToMany(() => Perguntas, perguntas => perguntas.questionario)
    perguntas: Perguntas[]

    // @OneToMany(() => Usuario_respostas, usuario_respostas => usuario_respostas.questionario)
    // usuario_respostas: Usuario_respostas[]
}
