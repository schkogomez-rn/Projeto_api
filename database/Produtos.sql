DROP TABLE produtos CASCADE;

-- Script para criação da tabela 'produtos' no PostgreSQL
CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    descricao TEXT
);

-- Inserindo um lote de dados iniciais para teste (Mock Data)
INSERT INTO produtos (nome, preco, descricao) VALUES 
('Teclado Mecânico', 250.00, 'Teclado mecânico switch blue com LED RGB.'),
('Mouse Gamer', 120.50, 'Mouse com 3200 DPI e botões laterais programáveis.'),
('Monitor 24" Full HD', 850.00, 'Monitor LED IPS 75Hz com bordas ultrafinas.'),
('Headset Gamer', 180.90, 'Headset com microfone com cancelamento de ruído e som surround 7.1.'),
('Cadeira Gamer', 1250.00, 'Cadeira ergonômica reclinável com almofadas lombar e cervical.'),
('SSD 1TB NVMe', 450.00, 'SSD de altíssima velocidade para leitura e gravação.'),
('Placa de Vídeo RTX 3060', 2100.00, 'Placa de vídeo de 12GB GDDR6 para jogos em alta resolução.'),
('Gabinete ATX', 300.00, 'Gabinete mid-tower com lateral de vidro temperado e 3 fans inclusos.'),
('Fonte 650W', 380.00, 'Fonte de alimentação com certificação 80 Plus Bronze.'),
('Webcam Full HD', 150.00, 'Webcam 1080p com microfone embutido para videoconferências.');


CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    quantidade INTEGER NOT NULL DEFAULT 0 CHECK (quantidade >= 0),
    descricao TEXT
);

-- Inserindo um lote de dados iniciais para teste (Mock Data)
INSERT INTO produtos (nome, preco, quantidade, descricao) VALUES 
('Teclado Mecânico', 250.00, 40, 'Teclado mecânico switch blue com LED RGB.'),
('Mouse Gamer', 120.50, 75, 'Mouse com 3200 DPI e botões laterais programáveis.'),
('Monitor 24" Full HD', 850.00, 25, 'Monitor LED IPS 75Hz com bordas ultrafinas.'),
('Headset Gamer', 180.90, 60, 'Headset com microfone com cancelamento de ruído e som surround 7.1.'),
('Cadeira Gamer', 1250.00, 12, 'Cadeira ergonômica reclinável com almofadas lombar e cervical.'),
('SSD 1TB NVMe', 450.00, 50, 'SSD de altíssima velocidade para leitura e gravação.'),
('Placa de Vídeo RTX 3060', 2100.00, 8, 'Placa de vídeo de 12GB GDDR6 para jogos em alta resolução.'),
('Gabinete ATX', 300.00, 20, 'Gabinete mid-tower com lateral de vidro temperado e 3 fans inclusos.'),
('Fonte 650W', 380.00, 30, 'Fonte de alimentação com certificação 80 Plus Bronze.'),
('Webcam Full HD', 150.00, 45, 'Webcam 1080p com microfone embutido para videoconferências.');
