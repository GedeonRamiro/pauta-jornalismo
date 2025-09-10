<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

# Documentação Backend NestJS – API Completa

## **Base URLs**

- **Auth:** `/auth`
- **User:** `/user`
- **Camera:** `/camera`
- **Office:** `/office`
- **Vehicle:** `/vehicle`
- **Pauta:** `/pauta`

---

## **1. Auth**

### **Login**

- **URL:** `/auth`
- **Método:** `POST`
- **Descrição:** Realiza login do usuário e retorna token de acesso.

#### Request

```json
{
  "email": "joao@example.com",
  "password": "senha123"
}
```

#### Response

```json
{
  "accessToken": "token.jwt.exemplo",
  "user": {
    "id": "123",
    "name": "João Silva",
    "email": "joao@example.com",
    "phone": "11999999999",
    "cpf": "123.456.789-00"
  }
}
```

---

## **2. User**

### **Criar usuário**

- **URL:** `/user`
- **Método:** `POST`

#### Request

```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "phone": "11999999999",
  "cpf": "123.456.789-00",
  "password": "senha123",
  "office_id": "1"
}
```

#### Response

```json
{
  "id": "123",
  "name": "João Silva",
  "email": "joao@example.com",
  "phone": "11999999999",
  "cpf": "123.456.789-00"
}
```

### **Listar usuários**

- **URL:** `/user`
- **Método:** `GET`
- **Roles:** Admin, UserIntermediary

#### Query Params

| Campo  | Descrição              |
| ------ | ---------------------- |
| limit  | Quantidade por página  |
| page   | Número da página       |
| filter | Filtrar por nome/email |

#### Response

```json
{
  "data": [
    {
      "id": "123",
      "name": "João Silva",
      "email": "joao@example.com",
      "phone": "11999999999",
      "cpf": "123.456.789-00",
      "office": { "id": "1", "name": "Editor Chefe" },
      "pauta": [{ "id": "1", "name": "Cobertura Jornalística" }]
    }
  ],
  "total": 100,
  "page": 1,
  "limit": 10
}
```

### **Buscar usuário por ID**

- **URL:** `/user/:id`
- **Método:** `GET`

#### Response

```json
{
  "id": "123",
  "name": "João Silva",
  "email": "joao@example.com",
  "phone": "11999999999",
  "cpf": "123.456.789-00",
  "office": { "id": "1", "name": "Editor Chefe" },
  "pauta": [{ "id": "1", "name": "Cobertura Jornalística" }]
}
```

### **Atualizar usuário**

- **URL:** `/user/:id`
- **Método:** `PUT`
- **Roles:** Admin

#### Request

```json
{
  "name": "João Atualizado",
  "phone": "11988888888",
  "office_id": "2",
  "updateAt": "2025-09-10T15:00:00Z"
}
```

#### Response

```json
{
  "id": "123",
  "name": "João Atualizado",
  "email": "joao@example.com",
  "phone": "11988888888",
  "cpf": "123.456.789-00",
  "office": { "id": "2", "name": "Editor Atualizado" },
  "pauta": [{ "id": "1", "name": "Cobertura Jornalística" }]
}
```

### **Deletar usuário**

- **URL:** `/user/:id`
- **Método:** `DELETE`
- **Roles:** Admin

#### Response

```json
{ "message": "Usuário deletado com sucesso" }
```

---

## **3. Camera**

### **Criar câmera**

- **URL:** `/camera`
- **Método:** `POST`
- **Roles:** Admin

#### Request

```json
{ "name": "Câmera 1", "identifierNumber": 123 }
```

#### Response

```json
{ "id": "1", "name": "Câmera 1", "identifierNumber": 123, "pauta": [] }
```

### **Listar câmeras**

- **URL:** `/camera`
- **Método:** `GET`
- **Roles:** Admin, UserIntermediary

#### Response

```json
{
  "data": [{ "id": "1", "name": "Câmera 1", "identifierNumber": 123 }],
  "total": 10,
  "page": 1,
  "limit": 10
}
```

### **Atualizar câmera**

- **URL:** `/camera/:id`
- **Método:** `PATCH`
- **Roles:** Admin

#### Request

```json
{
  "name": "Câmera Atualizada",
  "identifierNumber": 456,
  "updateAt": "2025-09-10T15:00:00Z"
}
```

#### Response

```json
{ "id": "1", "name": "Câmera Atualizada", "identifierNumber": 456, "pauta": [] }
```

### **Deletar câmera**

- **URL:** `/camera/:id`
- **Método:** `DELETE`

#### Response

```json
{ "message": "Câmera deletada com sucesso" }
```

---

## **4. Office**

### **Criar cargo**

- **URL:** `/office`
- **Método:** `POST`
- **Roles:** Admin

#### Request

```json
{ "name": "Editor Chefe" }
```

#### Response

```json
{ "id": "1", "name": "Editor Chefe", "user": [] }
```

### **Atualizar cargo**

- **URL:** `/office/:id`
- **Método:** `PATCH`

#### Request

```json
{ "name": "Editor Principal", "updateAt": "2025-09-10T15:00:00Z" }
```

#### Response

```json
{ "id": "1", "name": "Editor Principal", "user": [] }
```

### **Deletar cargo**

- **URL:** `/office/:id`
- **Método:** `DELETE`

#### Response

```json
{ "message": "Cargo deletado com sucesso" }
```

---

## **5. Vehicle**

### **Criar veículo**

- **URL:** `/vehicle`
- **Método:** `POST`
- **Roles:** Admin

#### Request

```json
{
  "model": "Civic",
  "manufacturer": "Honda",
  "plate": "ABC-1234",
  "color": "Preto"
}
```

#### Response

```json
{
  "id": "1",
  "model": "Civic",
  "manufacturer": "Honda",
  "plate": "ABC-1234",
  "color": "Preto",
  "pauta": []
}
```

### **Atualizar veículo**

- **URL:** `/vehicle/:id`
- **Método:** `PATCH`

#### Request

```json
{ "model": "Civic LX", "color": "Branco", "updateAt": "2025-09-10T15:00:00Z" }
```

#### Response

```json
{
  "id": "1",
  "model": "Civic LX",
  "manufacturer": "Honda",
  "plate": "ABC-1234",
  "color": "Branco",
  "pauta": []
}
```

### **Deletar veículo**

- **URL:** `/vehicle/:id`
- **Método:** `DELETE`

#### Response

```json
{ "message": "Veículo deletado com sucesso" }
```

---

## **6. Pauta**

### **Criar pauta**

- **URL:** `/pauta`
- **Método:** `POST`
- **Roles:** UserIntermediary, Admin

#### Request

```json
{
  "name": "Cobertura Jornalística",
  "infomation": "Detalhes da pauta",
  "cameraId": "1",
  "vehicleId": "1",
  "team": ["Equipe A"]
}
```

#### Response

```json
{
  "id": "1",
  "name": "Cobertura Jornalística",
  "infomation": "Detalhes da pauta",
  "user": { "id": "123", "name": "João Silva" },
  "camera": { "id": "1", "name": "Câmera 1" },
  "vehicle": { "id": "1", "model": "Civic" },
  "teams": ["Equipe A"]
}
```

### **Atualizar pauta**

- **URL:** `/pauta/:id`
- **Método:** `PUT`
- **Roles:** UserIntermediary, Admin

#### Request

```json
{
  "name": "Cobertura Jornalística Atualizada",
  "infomation": "Detalhes atualizados",
  "cameraId": "2",
  "vehicleId": "1",
  "team": ["Equipe B"],
  "updateAt": "2025-09-10T15:00:00Z"
}
```

#### Response

```json
{
  "id": "1",
  "name": "Cobertura Jornalística Atualizada",
  "infomation": "Detalhes atualizados",
  "user": { "id": "123", "name": "João Silva" },
  "camera": { "id": "2", "name": "Câmera 2" },
  "vehicle": { "id": "1", "model": "Civic" },
  "teams": ["Equipe B"]
}
```

### **Deletar pauta**

- **URL:** `/pauta/:id`
- **Método:** `DELETE`

#### Response

```json
{ "message": "Pauta deletada com sucesso" }
```
