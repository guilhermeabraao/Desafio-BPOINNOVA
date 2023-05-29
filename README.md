# Desafio-BPOINNOVA

## Instalação de dependências

Para realizar a instalação das dependências necessárias para rodar a aplicação, será necessário abrir o terminal nas pastas "backend" e "frontend"
e executar o seguinte comando

>npm install or yarn install

## Configurações básicas

Algumas variáveis de ambiente devem ser informadas para que a aplicação execute com sucesso.
Ambas as pastas contêm um arquivo example.env que servirá como base para as variáveis de ambiente.

No arquivo .env do backend é necessário informar a URL do banco de dados que será utilizado.
No arquivo .env do frontend é necessário informar a URL do backend.

No caminho *backend>utils* conterá dois arquivos, chamados createTable.js e dropTable.js.
Executando o arquivo createTable.js será criado todos as tabelas e relações necessárias a aplicação diretamente no banco de dados.
Executando o arquivo dropTables.js será excluída todas as tabelas e relações diretamente no banco de dados.

## Executando a aplicação

No terminal da pasta backend, execute o seguinte comando para subir o backend

>npm run dev

No terminal da pasta frontend, execute o seguinte comando para subir o backend

>npm start 

## Documentação Backend

Para conferir as rotas e suas especificações, basta acessar o caminho */docs* do URL da sua API que será exibida todas as informações pertinentes as rotas do backend.
