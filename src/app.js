// Arquivo: src/app.js

const express = require('express');
const cors = require('cors');

// Importa os arquivos de rotas
const produtoRoutes = require('./routes/produtoRoutes');
const pessoaRoutes = require('./routes/pessoaRoutes'); // 👈 NOVO: Importa as rotas de pessoas
const pedidoRoutes = require('./routes/pedidoRoutes');

const app = express();

// Configurações Globais (Middlewares)
app.use(express.json());
app.use(cors()); 

// Montagem de Rotas Principais
app.use('/produtos', produtoRoutes);
app.use('/pessoas', pessoaRoutes); // 👈 NOVO: Qualquer URL começando com /pessoas vai para pessoaRoutes
app.use('/pedidos', pedidoRoutes);

// ACOPLAMENTO: Exportamos a aplicação montada
app.use((req, res) => {
    res.status(404).json({ mensagem: 'Rota não encontrada' });
});

app.use((erro, req, res, next) => {
    if (erro instanceof SyntaxError && 'body' in erro) {
        return res.status(400).json({ mensagem: 'JSON inválido' });
    }

    console.error('Erro não tratado:', erro);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
});

module.exports = app;
