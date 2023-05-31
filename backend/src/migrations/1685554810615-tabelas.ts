import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class Tabelas1685554810615 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: 'usuarios',
            columns: [
                {
                    name: 'codigo',
                    type: 'serial',
                    isPrimary: true,
                },
                {
                    name: 'nome',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'senha',
                    type: 'text'
                },
                {
                    name: 'cpf',
                    type: 'text',
                    isUnique: true
                }
            ],
        }))

        await queryRunner.createTable(
            new Table({
                name: 'questionarios',
                columns: [
                    {
                        name: 'codigo',
                        type: 'serial',
                        isPrimary: true,
                    },
                    {
                        name: 'data',
                        type: 'date',
                        default: 'now()'
                    },
                    {
                        name: 'nome',
                        type: 'text',
                    },
                    {
                        name: 'descricao',
                        type: 'text',
                    },
                ],
            })
        )

        await queryRunner.createTable(
            new Table({
                name: 'perguntas',
                columns: [
                    {
                        name: 'codigo',
                        type: 'serial',
                        isPrimary: true,
                    },
                    {
                        name: 'codigo_questionario',
                        type: 'integer',
                    },
                    {
                        name: 'descricao',
                        type: 'text',
                    },
                    {
                        name: 'cod_perg',
                        type: 'text',
                        isUnique: true
                    },
                ],
            })
        )

        await queryRunner.createTable(new Table({
            name: 'respostas',
            columns: [
                {
                    name: 'codigo',
                    type: 'serial',
                    isPrimary: true,
                },
                {
                    name: 'usuario_resposta_codigo',
                    type: 'integer',
                },
                {
                    name: 'descricao',
                    type: 'text',
                },
                {
                    name: 'perg_cod',
                    type: 'text'
                },
                {
                    name: 'data',
                    type: 'date',
                    default: 'now()'
                }
            ],
        }));

        await queryRunner.createTable(new Table({
            name: 'usuario_resposta',
            columns: [
                {
                    name: 'codigo',
                    type: 'serial',
                    isPrimary: true,
                },
                {
                    name: 'codigo_usuario',
                    type: 'integer',
                },
                {
                    name: 'codigo_questionario',
                    type: 'integer',
                },
                {
                    name: 'data',
                    type: 'date',
                    default: 'now()'
                }
            ]
        }))

        await queryRunner.createForeignKey(
            'perguntas',
            new TableForeignKey({
                columnNames: ['codigo_questionario'],
                referencedTableName: 'questionarios',
                referencedColumnNames: ['codigo'],
                onDelete: 'CASCADE'
            })
        )
        await queryRunner.createForeignKey(
            'respostas',
            new TableForeignKey({
                columnNames: ['perg_cod'],
                referencedTableName: 'perguntas',
                referencedColumnNames: ['cod_perg'],
                onDelete: 'CASCADE'
            })
        )
        await queryRunner.createForeignKeys(
            'usuario_resposta', [
            new TableForeignKey({
                columnNames: ['codigo_usuario'],
                referencedTableName: 'usuarios',
                referencedColumnNames: ['codigo'],
                onDelete: 'CASCADE'
            }),
            new TableForeignKey({
                columnNames: ['codigo_questionario'],
                referencedTableName: 'questionarios',
                referencedColumnNames: ['codigo'],
                onDelete: 'CASCADE'
            })]
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("respostas");
        await queryRunner.dropTable("usuario_resposta");
        await queryRunner.dropTable("perguntas");
        await queryRunner.dropTable("questionarios");
        await queryRunner.dropTable("usuarios");
    }

}
