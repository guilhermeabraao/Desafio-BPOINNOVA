create database enquetes;

create table usuarios(
  codigo serial primary key,
  nome varchar(200),
  senha varchar(100),
  cpf varchar(50)
);

create table questionarios(
  codigo serial primary key,
  codigo_usuario integer references usuarios(codigo),
  data date,
  nome varchar(200),
  descricao varchar(200)
);

create table perguntas(
  codigo serial primary key,
  codigo_questionario integer references questionarios(codigo),
  descricao varchar(200),
  cod_perg varchar(50)
);

create table respostas(
  codigo serial primary key,
  descricao varchar(200),
  perg_cod varchar(50) references perguntas(cod_perg)
);