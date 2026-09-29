// Arquivo: src/routes/pedidoRoutes.js
const express = require('express');
const router = express.Router();

// ACOPLAMENTO: Importamos o Controller de Pedidos
const pedidoController = require('../controllers/pedidoController');

// Define as rotas HTTP e aponta para o controller
router.get('/', pedidoController.listarPedidos);

// ACOPLAMENTO: Exporta o router
module.exports = router;
