# Backend Application 

Destinado a gerenciar requisições e comunicar com o banco de dados em PostgreSQL. 

Construído sob o framework NestJS, Docker, Postgres e PgAdmin.

## Instalação

```bash
$ npm install
```

## Configuração do Banco de dados
Em `./database.providers.ts` pode-se alterar as configurações do banco de dados. 
Caso a base de dados default `base_project` não exista, será necessário sua criação.

## Rodando a aplicação `com` Docker

```bash
$ docker-compose up -d --build -V
```

## Rodando a aplicação `sem` Docker

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

