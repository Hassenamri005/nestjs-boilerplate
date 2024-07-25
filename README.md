[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue)](https://www.linkedin.com/in/hassenamri005/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Version](https://img.shields.io/badge/Version-1.0.0-yellow)](https://github.com/your-profile/your-repo/releases)

# Nest JS Boilerplate
![nestjs](https://github.com/user-attachments/assets/901842e8-5adb-4adb-8d22-fffb40a5347b)

NestJS boilerplate integrating Auth, Prisma, Postgres, Mailing, Docker, and Docker Compose.

## About

This project combines the following technologies:

- **Nest.js v10**
- **PostgreSQL**
- **Prisma** as an ORM
- **JWT Auth** (accessToken & refreshToken)
- **Roles Guard** (SUPERADMIN, ADMIN, USER, OTHER)
- **Docker**:
  - `Docker.dev` for an easy and fast development environment
  - `Docker.prod` for a production environment
- **Docker Compose**:
  - `docker-compose.dev.yaml` for an easy and fast development environment
  - `docker-compose.prod.yaml` for a production environment

# Features

## 1. Swagger-ts

Used Library: [swagger-typescript-api](https://www.npmjs.com/package/swagger-typescript-api)

- Supports OpenAPI 3.0, 2.0, JSON, and YAML
- Generates the API Client for Fetch or Axios from an OpenAPI Specification

We use this library to generate an **API TS** file (`src/api/myApi.ts`) from **swagger.json**, which contains a brief description of all our APIs.

Generate `myApi.ts` file:

```sh
npm run swagger:ts
```

Then copy the generated file `src/api/myApi.ts` to your frontend folder.

## 2. Migrations

Create a new migration:

```sh
npx prisma migrate dev --name "init"
```

- `--name`: is the name of generated migration

Deploy migrations to the database:

```sh
npx prisma migrate deploy
```

Upload seed dummy data to the database:

```sh
npx prisma db seed
```

# Run the project

Create `.env` file from `.env.example`:

```sh
cat .env.example >> .env
```

## In Development Environment

```sh
docker-compose -f docker-compose.dev.yaml up --build
```

## In Production Environment

```sh
docker-compose -f docker-compose.prod.yaml up --build
```
