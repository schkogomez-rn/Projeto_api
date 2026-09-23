// Arquivo: src/config/db.js

const { Pool } = require('pg'); // Importa a biblioteca do banco
require('dotenv').config(); // Avisa o Node para ler o arquivo .env

// Cria a conexão (pool) substituindo as senhas fixas pelas variáveis do .env
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

// ACOPLAMENTO: O module.exports permite que qualquer outro arquivo 
// do projeto use este "pool" para conversar com o banco.
module.exports = pool;
