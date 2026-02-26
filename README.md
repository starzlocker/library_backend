# Library Management System - Backend

Acessível via [http://libapi.duckdns.org/api/books] // 100% do tempo

Este repositório contém o backend de uma aplicação de livraria construída com Node.js, TypeScript e Express. O propósito principal é servir uma API REST para gerenciamento de livros, autores, gêneros e autenticação de usuários para o meu outro projeto <https://github.com/starzlocker/library_management_ts>.

## Principais tecnologias

- Node.js
- TypeScript
- Express
- Express-validator
- JSON Web Tokens (JWT) para autenticação
- bcrypt para hash de senhas
- Variáveis de ambiente do Node
- PostgreSQL (produção/local)
- Testes com o node test runner (testes unitários)
- Winston (logging)

## Instalação

1. Clone o repositório

   ```git clone git@github.com:starzlocker/library_management_system_backend```

2. Instale dependências

   npm install

3. Configure variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto (ou exporte variáveis no seu ambiente) com as seguintes variáveis mínimas:

```
DB_HOST=localhost
DB_PORT=6543
DB_USER=postgres
DB_NAME=postgres
DB_PASSWORD=SENHADOBANCO
MAX_DB_POOLSIZE=15
POOL_MODE=transaction
CLIENT_URL=https://thebookshelf-wheat.vercel.app
PORT=9000
```

## Execução

Para rodar o servidor em desenvolvimento:

```
npm run dev
```

Para rodar apenas a aplicação (produção):

```
npm run build
npm run start
```

## Rotas da API

O servidor expõe endpoints REST sob o prefixo `/api`. As principais rotas são:

Autenticação (`/api/auth`) (WIP)

- `POST /api/auth/login` - Autentica um usuário com email e senha. Retorna um token JWT.
- `POST /api/auth/signup` - Cria uma nova conta de usuário. Retorna um token JWT.
- `POST /api/auth/logout` - Invalida o token JWT atual (adiciona à blacklist temporária).
- `POST /api/auth/test_auth` - Endpoint protegido para testar se o token JWT é válido (requer autenticação).

Livros (`/api/books`)

- `GET /api/books` - Lista livros limitados a 15 itens por requisição, recebe um parâmetro pages. Aceita query params opcionais: `page`, `title`, `year`, `author`, `genre`.
- `GET /api/books/:id` - Busca livro por id (via query param `id`).
- `POST /api/books` - Cria um novo livro.
- `PUT /api/books/:id` - Atualiza um livro existente.
- `DELETE /api/books/:id` - Remove um livro.

## Validação de dados (express-validator) (WIP)

O projeto usa `express-validator` para validar dados de entrada nas rotas de autenticação. Por exemplo:

- No login e signup, o campo `email` é validado para garantir formato de email válido.
- No signup, a `password` deve ter no mínimo 6 caracteres.
- Os campos `name` e `last_name` são obrigatórios no signup.

Erros de validação retornam status HTTP 404 (ou outro código, dependendo do endpoint) com a lista de erros.

## Autenticação JWT (WIP)

Depois de fazer login ou signup, o usuário recebe um token JWT que deve ser enviado no header `Authorization` das requisições protegidas:

```
Authorization: Bearer <seu_token_jwt>
```

O token tem expiração configurada via `JWT_EXPIRES` (em segundos). O middleware `verifyJWT` no `AuthController` valida o token e armazena os dados decodificados em `res.locals.token` para uso nos próximos middlewares ou controladores.

Existe também uma blacklist em memória para tokens invalidados via logout. Quando um usuário faz logout, o token é adicionado à blacklist temporariamente (até expirar naturalmente).
