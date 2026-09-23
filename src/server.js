// Arquivo: src/server.js

require('dotenv').config(); // Lê as senhas seguras

// ACOPLAMENTO: Importa a aplicação já configurada do app.js
const app = require('./app');

const PORT = process.env.PORT || 3000;

// Liga a turbina!
app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso em http://localhost:${PORT}`);
});
