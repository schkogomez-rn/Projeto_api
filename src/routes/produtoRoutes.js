// Arquivo: src/routes/produtoRoutes.js

const express = require('express');
const router = express.Router(); 

// ACOPLAMENTO: Precisamos importar as funções do Controller
const produtoController = require('../controllers/produtoController');

// Quando houver um GET na rota principal ('/'), dispare a função listarProdutos
router.get('/', produtoController.listarProdutos);

// Quando houver um POST na rota principal ('/'), dispare a função criarProduto
router.post('/', produtoController.criarProduto);

// ACOPLAMENTO: Exporta o conjunto de rotas de produtos
module.exports = router;
