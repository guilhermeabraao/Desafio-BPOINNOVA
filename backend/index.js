require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rotas = require('./router');
const app = express();

app.use(cors());
app.use(express.json());
app.use(rotas);

app.listen(4000)