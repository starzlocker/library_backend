# Livraria Modelo - Backend

Este repositório contém o backend de uma aplicação de livraria construída com Node.js e Express. O propósito principal é servir uma API REST para gerenciamento de livros, autores, gêneros e autenticação de usuários para o meu outro projeto <https://github.com/starzlocker/site_library>.

## Principais tecnologias

- Node.js
- Express
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
