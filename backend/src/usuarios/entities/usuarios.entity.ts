// import { Usuario_respostas } from "src/respostas/entities/usuario_respostas.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Usuarios {
    @PrimaryGeneratedColumn()
    codigo: number;

    @Column({ nullable: true })
    nome: string;

    @Column()
    senha: string;

    @Column()
    cpf: string;

    // @OneToMany(() => Usuario_respostas, usuarios_respostas => usuarios_respostas.usuario)
    // usuario_respostas: Usuario_respostas[]
}
