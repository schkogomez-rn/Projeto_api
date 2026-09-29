// Arquivo: src/controllers/pedidoController.js

// ACOPLAMENTO: O Controller importa o Repository de Pedidos
const PedidoRepository = require('../repositories/pedidoRepository');

const listarPedidos = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const pedidos = await PedidoRepository.getAllPedidos(limit, offset);
        
        res.json({
            paginaAtual: page,
            itensPorPagina: limit,
            quantidadeRetornada: pedidos.length,
            dados: pedidos
        });
    } catch (erro) {
        console.error('Erro ao buscar pedidos:', erro.message);
        res.status(500).json({ mensagem: 'Erro interno ao buscar pedidos' });
    }
};

// ACOPLAMENTO: Exporta o controlador
module.exports = {
    listarPedidos
};
