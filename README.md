# CRUD Simple

Uma API para gerenciar usuários, produtores, fazendas e safras plantadas.

## Tecnologias

- **Node.js**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **Express.js**

---

## Endpoints Disponíveis

### **1. Usuários (`/users`)**

| Método | Endpoint     | Descrição                | Autenticação |
| ------ | ------------ | ------------------------ | ------------ |
| POST   | `/users`     | Criar um novo usuário    | Não          |
| GET    | `/users`     | Listar todos os usuários | Sim          |
| GET    | `/users/:id` | Obter um usuário         | Sim          |
| PUT    | `/users/:id` | Atualizar um usuário     | Sim          |
| DELETE | `/users/:id` | Excluir um usuário       | Sim          |

### **2. Produtores (`/producers`)**

| Método | Endpoint         | Descrição                    | Autenticação |
| ------ | ---------------- | ---------------------------- | ------------ |
| POST   | `/producers`     | Criar um novo produtor       | Sim          |
| GET    | `/producers`     | Listar todos os produtores   | Sim          |
| GET    | `/producers/:id` | Obter um produtor específico | Sim          |
| PUT    | `/producers/:id` | Atualizar um produtor        | Sim          |
| DELETE | `/producers/:id` | Excluir um produtor          | Sim          |

---

### **Formato de Requisição e Respostas**

#### **Criar Usuário**

- **POST** `/users`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "123456"
  }
  ```
