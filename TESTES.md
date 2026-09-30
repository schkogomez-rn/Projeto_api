# 🧪 Guia Geral de Testes da API (CRUD Completo e Blindagem)

Este documento contém todas as orientações, cenários de teste, exemplos de requisições e respostas esperadas para validar o funcionamento geral da **Projeto_API** (com as entidades **Produtos**, **Pessoas** e **Pedidos**).

---

## 📋 Sumário
1. [Visão Geral e Arquitetura](#-visão-geral-e-arquitetura)
2. [Pré-requisitos e Inicialização](#-pré-requisitos-e-inicialização)
3. [Ferramentas Recomendadas para Testes](#-ferramentas-recomendadas-para-testes)
4. [Tabela de Rotas da API](#-tabela-de-rotas-da-api)
5. [Cenários de Teste: Módulo de Produtos (CRUD Completo)](#-cenários-de-teste-módulo-de-produtos-crud-completo)
6. [Cenários de Teste: Módulo de Pessoas](#-cenários-de-teste-módulo-de-pessoas)
7. [Cenários de Teste: Módulo de Pedidos](#-cenários-de-teste-módulo-de-pedidos)
8. [Tratamento de Erros e Códigos de Status HTTP](#-tratamento-de-erros-e-códigos-de-status-http)

---

## 🏛 Visão Geral e Arquitetura

A API foi construída seguindo o padrão de **Arquitetura em Camadas (Layered Architecture)**:

```
Requisição HTTP (Client)
        │
        ▼
   [src/app.js] (Middlewares & Roteador Global)
        │
        ▼
   [src/routes/*.js] (Definição de Endpoints & Verbos HTTP)
        │
        ▼
   [src/controllers/*.js] (Validações, Blindagem & Regras de Negócio)
        │
        ▼
   [src/repositories/*.js] (Consultas SQL, RETURNING * & Acesso a Dados)
        │
        ▼
   [src/config/db.js] (Pool de Conexão com PostgreSQL)
```

### ✨ Novidades da Parte 5 (CRUD Completo & Blindagem de Produtos):
- **Cláusula `RETURNING *` no PostgreSQL:** Tanto o `UPDATE` quanto o `DELETE` retornam a linha exata afetada, evitando consultas extras (`SELECT`) desnecessárias.
- **Blindagem do `PUT` (3 Barreiras):**
  1. Validação de ID numérico na URL (`400 Bad Request` se inválido).
  2. Validação de corpo completo: `nome`, `preco` e `descricao` obrigatórios (`400 Bad Request` se incompleto).
  3. Verificação de existência do registro no banco (`404 Not Found` se não encontrar).
- **Blindagem do `DELETE`:**
  1. Validação de ID numérico na URL (`400 Bad Request`).
  2. Verificação de existência do registro (`404 Not Found`).
  3. Retorno dos dados do item que foi deletado (`200 OK`).

---

## 🚀 Pré-requisitos e Inicialização

### 1. Configurar o arquivo `.env`
Certifique-se de que o arquivo `.env` na raiz do projeto contenha as credenciais corretas do seu banco de dados PostgreSQL:

```env
DB_USER=seu_usuario
DB_HOST=localhost
DB_NAME=nome_do_banco
DB_PASSWORD=sua_senha
DB_PORT=5432
PORT=3000
```

### 2. Criar as Tabelas e Carga Inicial (Mock Data)
Execute os scripts SQL da pasta `database/` no seu banco PostgreSQL (via DBeaver, pgAdmin, VS Code SQLTools ou psql):
- `database/Pessoas.sql`
- `database/Produtos.sql`
- `database/Pedidos.sql`

### 3. Iniciar o Servidor
No terminal, na raiz do projeto:

```bash
# Modo desenvolvimento (com reinicialização automática)
npm run dev

# Ou modo padrão
npm start
```

O servidor estará rodando em: `http://localhost:3000`

---

## 🛠 Ferramentas Recomendadas para Testes

1. **Arquivo `requisicoes.http` (Extensão REST Client do VS Code):**
   - Basta abrir o arquivo [requisicoes.http](file:///c:/Users/a92417447/Desktop/UC9%20-%20Servi%C3%A7os%20web/23-9/Projeto_api/requisicoes.http) e clicar em **"Send Request"** sobre qualquer rota.
2. **Thunder Client / Postman / Insomnia:**
   - Crie uma coleção apontando para a base URL `http://localhost:3000`.

---

## 📑 Tabela de Rotas da API

| Método | Endpoint | Descrição | Parâmetros / Body |
| :--- | :--- | :--- | :--- |
| **GET** | `/produtos` | Lista produtos (com paginação) | Query: `?page=1&limit=10` |
| **POST** | `/produtos` | Cadastra novo produto | Body JSON (`nome`, `preco`, `descricao`) |
| **PUT** | `/produtos/:id` | Atualiza produto completo | Param `:id` + Body JSON completo |
| **DELETE** | `/produtos/:id` | Remove um produto | Param `:id` |
| **GET** | `/pessoas` | Lista pessoas (com paginação) | Query: `?page=1&limit=10` |
| **GET** | `/pessoas/:id` | Busca pessoa por ID | Param `:id` |
| **GET** | `/pessoas/cpf/:cpf`| Busca pessoa por CPF | Param `:cpf` |
| **POST** | `/pessoas` | Cadastra nova pessoa | Body JSON (`nome`, `email`, `telefone`, `cpf`, `senha`) |
| **GET** | `/pedidos` | Lista pedidos com JOIN | Query: `?page=1&limit=10` |

---

## 📦 Cenários de Teste: Módulo de Produtos (CRUD Completo)

### 1. Listar Produtos (GET `/produtos`)
- **Método:** `GET`
- **URL:** `http://localhost:3000/produtos?page=1&limit=5`
- **Status Esperado:** `200 OK`
- **Exemplo de Resposta:**
```json
{
  "paginaAtual": 1,
  "itensPorPagina": 5,
  "quantidadeRetornada": 5,
  "dados": [
    {
      "id": 1,
      "nome": "Teclado Mecânico",
      "preco": "250.00",
      "descricao": "Teclado mecânico switch blue com LED RGB."
    }
  ]
}
```

---

### 2. Cadastrar Produto (POST `/produtos`)
- **Método:** `POST`
- **URL:** `http://localhost:3000/produtos`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "nome": "Monitor Gamer 24",
  "preco": 850.00,
  "descricao": "Monitor Full HD 144Hz"
}
```
- **Status Esperado:** `201 Created`
- **Exemplo de Resposta:**
```json
{
  "id": 11,
  "nome": "Monitor Gamer 24",
  "preco": "850.00",
  "descricao": "Monitor Full HD 144Hz"
}
```

---

### 3. Atualizar Produto - Sucesso (PUT `/produtos/:id`)
- **Método:** `PUT`
- **URL:** `http://localhost:3000/produtos/1`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "nome": "Teclado Mecânico RGB Pro",
  "preco": 299.90,
  "descricao": "Teclado mecânico switch red silencioso e hot-swap."
}
```
- **Status Esperado:** `200 OK`
- **Exemplo de Resposta (via `RETURNING *`):**
```json
{
  "id": 1,
  "nome": "Teclado Mecânico RGB Pro",
  "preco": "299.90",
  "descricao": "Teclado mecânico switch red silencioso e hot-swap."
}
```

---

### 4. Atualizar Produto - Testes de Blindagem / Validação

#### A. Tentativa de Atualização Incompleta (Sem todos os campos obrigatórios):
- **Método:** `PUT`
- **URL:** `http://localhost:3000/produtos/1`
- **Body:**
```json
{
  "nome": "Só o nome do produto"
}
```
- **Status Esperado:** `400 Bad Request`
- **Resposta:**
```json
{
  "mensagem": "Para atualizar, você deve enviar nome, preco e descricao obrigatoriamente."
}
```

#### B. ID Inválido na URL:
- **Método:** `PUT`
- **URL:** `http://localhost:3000/produtos/abc`
- **Body:** `{ "nome": "A", "preco": 10, "descricao": "B" }`
- **Status Esperado:** `400 Bad Request`
- **Resposta:**
```json
{
  "mensagem": "O ID informado na URL é inválido."
}
```

#### C. Produto Inexistente no Banco de Dados:
- **Método:** `PUT`
- **URL:** `http://localhost:3000/produtos/99999`
- **Body:** `{ "nome": "Inexistente", "preco": 50.00, "descricao": "Teste" }`
- **Status Esperado:** `404 Not Found`
- **Resposta:**
```json
{
  "mensagem": "Produto não encontrado no banco de dados."
}
```

---

### 5. Deletar Produto (DELETE `/produtos/:id`)

#### A. Sucesso:
- **Método:** `DELETE`
- **URL:** `http://localhost:3000/produtos/1`
- **Status Esperado:** `200 OK`
- **Exemplo de Resposta (com os dados do item excluído via `RETURNING *`):**
```json
{
  "mensagem": "Produto deletado com sucesso",
  "deletado": {
    "id": 1,
    "nome": "Teclado Mecânico RGB Pro",
    "preco": "299.90",
    "descricao": "Teclado mecânico switch red silencioso e hot-swap."
  }
}
```

#### B. ID Inválido:
- **Método:** `DELETE`
- **URL:** `http://localhost:3000/produtos/xyz`
- **Status Esperado:** `400 Bad Request`
- **Resposta:**
```json
{
  "mensagem": "O ID informado na URL é inválido."
}
```

#### C. Produto Não Encontrado (ou já deletado):
- **Método:** `DELETE`
- **URL:** `http://localhost:3000/produtos/99999`
- **Status Esperado:** `404 Not Found`
- **Resposta:**
```json
{
  "mensagem": "Produto não encontrado para exclusão"
}
```

---

## 👤 Cenários de Teste: Módulo de Pessoas

### 1. Listar Pessoas (GET `/pessoas`)
- **Método:** `GET`
- **URL:** `http://localhost:3000/pessoas?page=1&limit=5`
- **Status Esperado:** `200 OK`

### 2. Buscar Pessoa por ID (GET `/pessoas/:id`)
- **Método:** `GET`
- **URL:** `http://localhost:3000/pessoas/1`
- **Status Esperado:** `200 OK` (ou `404` se não existir)

### 3. Buscar Pessoa por CPF (GET `/pessoas/cpf/:cpf`)
- **Método:** `GET`
- **URL:** `http://localhost:3000/pessoas/cpf/125.959.743-19`
- **Status Esperado:** `200 OK`

### 4. Cadastrar Nova Pessoa (POST `/pessoas`)
- **Método:** `POST`
- **URL:** `http://localhost:3000/pessoas`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "nome": "Mariana Souza",
  "email": "mariana.souza@teste.com",
  "telefone": "(11) 98765-4321",
  "cpf": "555.666.777-88",
  "senha": "senhaForte@2026"
}
```
- **Status Esperado:** `201 Created`
- **Teste de Conflito de Unicidade:** Tentar cadastrar novamente com o mesmo email ou CPF resultará em `400 Bad Request` com a mensagem `"Este email ou CPF já está cadastrado"`.

---

## 🛒 Cenários de Teste: Módulo de Pedidos

### 1. Listar Pedidos (GET `/pedidos`)
- **Método:** `GET`
- **URL:** `http://localhost:3000/pedidos?page=1&limit=5`
- **Status Esperado:** `200 OK`
- **Exemplo de Resposta:**
```json
{
  "paginaAtual": 1,
  "itensPorPagina": 5,
  "quantidadeRetornada": 5,
  "dados": [
    {
      "pedido_id": 1,
      "cliente": "Ana Silva",
      "produto": "Teclado Mecânico",
      "quantidade": 2,
      "data_pedido": "2026-03-24T14:30:00.000Z"
    }
  ]
}
```

---

## 🚦 Tratamento de Erros e Códigos de Status HTTP

| Código HTTP | Significado | Quando Ocorre |
| :--- | :--- | :--- |
| `200 OK` | Sucesso | Consultas (GET), atualizações completas (PUT) e exclusões (DELETE). |
| `201 Created` | Criado com Sucesso | Criação de novos produtos ou pessoas (POST). |
| `400 Bad Request` | Requisição Inválida | ID inválido (NaN), campos obrigatórios ausentes no body ou violação de unicidade (CPF/email duplicado). |
| `404 Not Found` | Não Encontrado | ID ou CPF pesquisado/atualizado/deletado não existe no banco, ou rota inexistente. |
| `500 Internal Server Error` | Erro do Servidor | Falha inesperada ou erro de conexão com o banco de dados. |

---

## 💡 Dicas de Manutenção e Reset de Dados
Caso queira restaurar os dados de teste para o estado original, basta reexecutar os arquivos SQL:
1. `database/Produtos.sql` para recriar e popular os produtos.
2. `database/Pessoas.sql` para recriar e popular as pessoas.
3. `database/Pedidos.sql` para recriar os pedidos vinculados.
