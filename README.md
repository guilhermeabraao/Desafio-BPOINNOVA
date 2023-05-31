# Desafio-BPOINNOVA

## Instalação de dependências

Para realizar a instalação das dependências necessárias para rodar a aplicação, será necessário abrir o terminal nas pastas "backend" e "frontend"
e executar o seguinte comando

>npm install or yarn install

## Configurações básicas

Algumas variáveis de ambiente devem ser informadas para que a aplicação execute com sucesso.
Ambas as pastas contêm um arquivo example.env que servirá como base para as variáveis de ambiente.

No arquivo .env do backend é necessário informar a os dados do banco de dados que será utilizado.
No arquivo .env do frontend é necessário informar a URL do backend.

Para subir as tabelas, utilize o seguinte comando no terminal do backend

>npm run migration:run

## Executando a aplicação

No terminal da pasta backend, execute o seguinte comando para subir o backend

>npm run start

No terminal da pasta frontend, execute o seguinte comando para subir o backend

>npm start 

## Documentação Backend

Para conferir as rotas e suas especificações, basta acessar o caminho */api* do URL da sua API que será exibida todas as informações pertinentes as rotas do backend.
