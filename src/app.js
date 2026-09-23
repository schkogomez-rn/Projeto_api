// Arquivo: src/app.js

const express = require('express');
const cors = require('cors');

// ACOPLAMENTO: Trazemos as nossas rotas configuradas no Passo 5
const produtoRoutes = require('./routes/produtoRoutes');

const app = express();

// Configurações Globais (Middlewares)
app.use(express.json());
app.use(cors()); 

// Montagem de Rotas
app.use('/produtos', produtoRoutes);

// ACOPLAMENTO: Exportamos a aplicação montada
module.exports = app;
