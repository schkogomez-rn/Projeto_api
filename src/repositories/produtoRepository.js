// Arquivo: src/repositories/produtoRepository.js

// ACOPLAMENTO: O Repository precisa falar com o banco, então importamos a conexão.
const pool = require('../config/db');

// Função para buscar todos os produtos com paginação
const getAllProdutos = async (limit, offset) => {
    // Adicionamos ORDER BY id para garantir que a ordem das páginas não mude aleatoriamente
    const sql = 'SELECT * FROM produtos ORDER BY id LIMIT $1 OFFSET $2';
    const resultado = await pool.query(sql, [limit, offset]); // Executa no banco
    return resultado.rows; // Devolve apenas a lista de produtos (as linhas)
};

// Função para criar um produto
const createProduto = async (nome, preco, descricao) => {
    const sql = 'INSERT INTO produtos (nome, preco, descricao) VALUES ($1, $2, $3) RETURNING *';
    const resultado = await pool.query(sql, [nome, preco, descricao]);
    return resultado.rows[0]; // Devolve o produto que acabou de ser criado
};

// Função para atualizar um produto existente (Note o RETURNING *)
const updateProduto = async (id, nome, preco, descricao) => {
    const sql = 'UPDATE produtos SET nome = $1, preco = $2, descricao = $3 WHERE id = $4 RETURNING *';
    const resultado = await pool.query(sql, [nome, preco, descricao, id]);
    return resultado; 
};

// Função para deletar um produto (Note o RETURNING *)
const deleteProduto = async (id) => {
    const sql = 'DELETE FROM produtos WHERE id = $1 RETURNING *';
    const resultado = await pool.query(sql, [id]);
    return resultado;
};

// ACOPLAMENTO: Exportamos as funções para que outros arquivos (como o Controller) possam usá-las.
module.exports = {
    getAllProdutos,
    createProduto,
    updateProduto,
    deleteProduto
};
