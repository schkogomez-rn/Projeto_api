DROP TABLE pessoas CASCADE;

CREATE TABLE pessoas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INT NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(100) NOT NULL
);

-- 2. Inserção de 10 Usuários Fictícios (Dados Mockados)
INSERT INTO pessoas (nome, idade, email, senha) VALUES
('Ana Clara Souza', 25, 'ana.souza@email.com', 'senha123'),
('Bruno Oliveira', 32, 'bruno.oliveira@email.com', 'bruno2024'),
('Carla Mendes', 19, 'carla.mendes@email.com', 'carlasenha'),
('Daniel Costa', 41, 'daniel.costa@email.com', 'dani4141'),
('Eduarda Lima', 28, 'eduarda.lima@email.com', 'dudaPass!'),
('Felipe Rocha', 35, 'felipe.rocha@email.com', 'felipe3535'),
('Gabriela Santos', 22, 'gabi.santos@email.com', 'gabi1234'),
('Heitor Alves', 50, 'heitor.alves@email.com', 'heitor#2024'),
('Isabela Martins', 27, 'isabela.m@email.com', 'isaMartins'),
('João Pedro Silva', 30, 'joao.silva@email.com', 'joao3030');

select * from pessoas
