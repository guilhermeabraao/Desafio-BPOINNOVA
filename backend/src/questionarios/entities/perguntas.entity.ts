import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Questionarios } from "./questionarios.entity";

@Entity()
export class Perguntas {
    @PrimaryGeneratedColumn()
    codigo: number;

    @Column()
    codigo_questionario: number

    @Column()
    descricao: string

    @Column()
    cod_perg: string

    @ManyToOne(() => Questionarios, questionario => questionario.perguntas)
    @JoinColumn({ name: "codigo_questionario" })
    questionario: Questionarios
}