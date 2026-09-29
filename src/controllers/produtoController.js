// Arquivo: src/controllers/produtoController.js

// ACOPLAMENTO: O Controller precisa do Repository para manipular os dados no banco.
const ProdutoRepository = require('../repositories/produtoRepository');

// Função ativada quando o usuário quer ver os produtos
const listarProdutos = async (req, res) => {
    try {
        // Captura da URL: http://localhost:3000/produtos?page=1&limit=10
        // Se o usuário não mandar nada, o padrão será página 1, com 10 itens.
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        // Matemática da paginação: (página - 1) * limite
        const offset = (page - 1) * limit;

        const produtos = await ProdutoRepository.getAllProdutos(limit, offset);
        
        // Retornamos um objeto mais rico, avisando o usuário em qual página ele está
        res.json({
            paginaAtual: page,
            itensPorPagina: limit,
            quantidadeRetornada: produtos.length,
            dados: produtos
        });
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ mensagem: 'Erro interno' });
    }
};

// Função ativada quando o usuário quer cadastrar algo
const criarProduto = async (req, res) => {
    try {
        // Descasca a requisição: extrai as informações do corpo (body)
        const { nome, preco, descricao } = req.body;
        if (typeof nome !== 'string' || !nome.trim()) {
            return res.status(400).json({ mensagem: 'Nome é obrigatório' });
        }

        const precoNumerico = Number(preco);
        if (!Number.isFinite(precoNumerico) || precoNumerico < 0) {
            return res.status(400).json({ mensagem: 'Preço deve ser um número maior ou igual a zero' });
        }
        
        // Pede ao Repository: "Salve isso no banco pra mim"
        const novoProduto = await ProdutoRepository.createProduto(nome.trim(), precoNumerico, descricao);
        
        // Responde ao usuário informando que foi criado (Status 201)
        res.status(201).json(novoProduto);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ mensagem: 'Erro ao cadastrar produto' });
    }
};

// ACOPLAMENTO: Exporta este "cérebro" para que as Rotas saibam o que acionar.
module.exports = { 
    listarProdutos, 
    criarProduto 
};
