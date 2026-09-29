// Arquivo: src/repositories/pedidoRepository.js

// ACOPLAMENTO: O Repository precisa falar com o banco, então importamos a conexão.
const pool = require('../config/db');

const getAllPedidos = async (limit, offset) => {
    const sql = `
        SELECT 
            pedidos.id AS pedido_id,
            pessoas.nome AS cliente,
            produtos.nome AS produto,
            pedidos.quantidade,
            pedidos.data_pedido
        FROM pedidos
        INNER JOIN pessoas ON pedidos.pessoa_id = pessoas.id
        INNER JOIN produtos ON pedidos.produto_id = produtos.id
        ORDER BY pedidos.data_pedido DESC
        LIMIT $1 OFFSET $2;
    `;
    const resultado = await pool.query(sql, [limit, offset]);
    return resultado.rows;
};

// ACOPLAMENTO: Exporta as funções
module.exports = {
    getAllPedidos
};
