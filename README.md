# Livraria Modelo - Backend

Este repositório contém o backend de uma aplicação de livraria construída com Node.js e Express. O propósito principal é servir uma API REST para gerenciamento de livros, autores, gêneros e autenticação de usuários para o meu outro projeto <https://github.com/starzlocker/site_library>.

## Principais tecnologias

- Node.js
- Express
- Express-validator
- JSON Web Tokens (JWT) para autenticação
- bcrypt para hash de senhas
- dotenv para variáveis de ambiente
- PostgreSQL (produção/local)
- Jest (testes unitários)
- Winston (logging)
- Knex (migrations)

## Instalação

1. Clone o repositório

   git clone <URL_DO_REPOSITORIO>

2. Instale dependências

   npm install

3. Configure variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto (ou exporte variáveis no seu ambiente) com as seguintes variáveis mínimas:

```
CONNECTION_STRING=postgresql://<usuario>:<senha>@<host>:<porta>/<database>
JWT_SECRET=sua_chave_secreta
JWT_EXPIRES=3600
```

## Execução

Para rodar o servidor em desenvolvimento:

```
npm run dev
```

Para rodar apenas a aplicação (produção):

```
npm start
```

## Rotas da API

O servidor expõe endpoints REST sob o prefixo `/api`. As principais rotas são:

Autenticação (`/api/auth`)

- `POST /api/auth/login` - Autentica um usuário com email e senha. Retorna um token JWT.
- `POST /api/auth/signup` - Cria uma nova conta de usuário. Retorna um token JWT.
- `POST /api/auth/logout` - Invalida o token JWT atual (adiciona à blacklist temporária).
- `POST /api/auth/test_auth` - Endpoint protegido para testar se o token JWT é válido (requer autenticação).

Livros (`/api/books`)

- `GET /api/books` - Lista livros. Aceita query params opcionais: `title`, `author`, `year`.
- `GET /api/books/:id` - Busca livro por título (via query param `id.book_title`).
- `POST /api/books` - Cria um novo livro.
- `PUT /api/books/:id` - Atualiza um livro existente.
- `DELETE /api/books/:id` - Remove um livro.

## Validação de dados (express-validator)

O projeto usa `express-validator` para validar dados de entrada nas rotas de autenticação. Por exemplo:

- No login e signup, o campo `email` é validado para garantir formato de email válido.
- No signup, a `password` deve ter no mínimo 6 caracteres.
- Os campos `name` e `last_name` são obrigatórios no signup.

Erros de validação retornam status HTTP 404 (ou outro código, dependendo do endpoint) com a lista de erros.

## Autenticação JWT

Depois de fazer login ou signup, o usuário recebe um token JWT que deve ser enviado no header `Authorization` das requisições protegidas:

```
Authorization: Bearer <seu_token_jwt>
```

O token tem expiração configurada via `JWT_EXPIRES` (em segundos). O middleware `verifyJWT` no `AuthController` valida o token e armazena os dados decodificados em `res.locals.token` para uso nos próximos middlewares ou controladores.

Existe também uma blacklist em memória para tokens invalidados via logout. Quando um usuário faz logout, o token é adicionado à blacklist temporariamente (até expirar naturalmente).

## Testes

Este projeto usa Jest para os testes unitários. Para rodar a suíte de testes:

```
npm test
```

## Observações sobre testes

- Os testes unitários usam mocks para evitar conexões reais ao banco de dados.
- As variáveis de ambiente necessárias para os testes (por exemplo `JWT_SECRET`) são definidas nos próprios testes ou em arquivos de setup do Jest.

## Banco de dados

As migrations estão no diretório `migrations/`. Para aplicar migrations localmente use a ferramenta que preferir (por exemplo Knex) apontando para a `CONNECTION_STRING` correta.

## CI / GitHub Actions

O repositório inclui configurações de GitHub Actions que executam a suíte de testes automaticamente em pull requests e pushes para branches principais. A pipeline roda os testes e publica o resultado como parte do fluxo de integração contínua.

## Estrutura do projeto (resumida)

- `src/` - código fonte
  - `controllers/` - controladores da API
  - `repositories/` - acesso à camada de dados
  - `models/` - modelos de domínio
  - `database/` - setup, migrations e seeds
  - `config/` - configuração do logger e outras configurações
- `tests/` - testes (quando aplicável)
- `migrations/` - scripts de criação de tabelas
- `public/`, `uploads/` - arquivos estáticos e uploads
