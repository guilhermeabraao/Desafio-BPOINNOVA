exports.up = function (knex) {
    return knex.schema
        .createTable('usuarios', function (table) {
            table.increments('codigo').primary();
            table.string('nome', 200);
            table.string('senha', 100);
            table.string('cpf', 50);
        })
        .createTable('questionarios', function (table) {
            table.increments('codigo').primary();
            table.date('data');
            table.string('nome', 200);
            table.string('descricao', 200);
        })
        .createTable('usuario_resposta', function (table) {
            table.increments('codigo').primary();
            table.integer('codigo_usuario').references('codigo').inTable('usuarios').onDelete('cascade');
            table.integer('codigo_questionario').references('codigo').inTable('questionarios').onDelete('cascade');
            table.date('data');
        })
        .createTable('perguntas', function (table) {
            table.increments('codigo').primary();
            table.integer('codigo_questionario').references('codigo').inTable('questionarios').onDelete('cascade');
            table.string('descricao', 200);
            table.string('cod_perg', 50).unique();
        })
        .createTable('respostas', function (table) {
            table.increments('codigo').primary();
            table.string('descricao', 200);
            table.string('perg_cod', 50).references('cod_perg').inTable('perguntas').onDelete('cascade');
            table.integer('usuario_resposta_codigo').references('codigo').inTable('usuario_resposta').onDelete('cascade');
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('respostas')
        .dropTable('perguntas')
        .dropTable('usuario_resposta')
        .dropTable('questionarios')
        .dropTable('usuarios');
};

