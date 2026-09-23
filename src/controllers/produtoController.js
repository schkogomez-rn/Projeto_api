// Arquivo: src/controllers/produtoController.js

// ACOPLAMENTO: O Controller precisa do Repository para manipular os dados no banco.
const ProdutoRepository = require('../repositories/produtoRepository');

// Função ativada quando o usuário quer ver os produtos
const listarProdutos = async (req, res) => {
    try {
        // Pede ao Repository: "Me dê todos os produtos"
        const produtos = await ProdutoRepository.getAllProdutos(); 
        
        // Responde ao usuário com a lista em formato JSON
        res.json(produtos); 
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ mensagem: 'Erro interno ao buscar produtos' });
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
