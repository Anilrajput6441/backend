# Mini CRM Backend

A mini CRM backend API built using **Node.js, Express, PostgreSQL, Prisma, JWT Authentication, Swagger, and Docker**.  
This project is developed as part of a backend internship assignment and demonstrates role-based authorization, DTO validation, REST APIs, and containerized backend setup.

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JWT Authentication
- bcrypt
- Swagger (OpenAPI)
- class-validator & class-transformer
- CORS
- Docker & Docker Compose

---

## Features

### Authentication
- User registration & login
- JWT-based authentication
- Password hashing using bcrypt
- Roles supported:
  - `ADMIN`
  - `EMPLOYEE`

---

### Users (ADMIN only)
- Get all users
- Get user by ID
- Update user role (ADMIN ↔ EMPLOYEE)

---

### Customers
- ADMIN: Full CRUD access
- EMPLOYEE: Read-only access
- Pagination support
- Unique email & phone validation

---

### Tasks
- ADMIN can create tasks
- Tasks are linked to customers
- Tasks can only be assigned to EMPLOYEES
- ADMIN can view all tasks
- EMPLOYEE can view only assigned tasks
- EMPLOYEE can update status of their own tasks only

---

## Project Structure

```text
.
├── config/          # Prisma & Swagger configuration
├── controllers/     # Request handling logic
├── dtos/            # DTO validation classes
├── middlewares/     # Auth, role, validation, error handling
├── prisma/          # Database schema and migrations
├── routes/          # API route definitions
├── services/        # Business logic
├── app.js           # Express app configuration
└── server.js        # Application entry point
```

---

## Environment Variables

### Local Development (.env)
```env
PORT=8081
DATABASE_URL=postgresql://username:password@localhost:5432/mini_crm
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
```

When running with Docker, database credentials are provided via `docker-compose.yml`.

---

## Setup & Installation

### Option 1: Run Locally (Without Docker)

1️⃣ **Clone the repository**
```bash
git clone <repository-url>
cd mini-crm-backend
```

2️⃣ **Install dependencies**
```bash
npm install
```

3️⃣ **Setup Prisma & Database**
```bash
npx prisma migrate dev --name init
npx prisma generate
```

4️⃣ **Start the server**
```bash
npm run dev
```

Server will run at: [http://localhost:8081](http://localhost:8081)

---

### Option 2: Run with Docker (Recommended)

#### Prerequisites
- Docker
- Docker Compose

#### Steps
1️⃣ **Build and start containers**
```bash
docker-compose up --build
```

2️⃣ **Backend URL**
[http://localhost:8081](http://localhost:8081)

3️⃣ **Swagger Documentation**
[http://localhost:8081/api-docs](http://localhost:8081/api-docs)

4️⃣ **Health Check**
[http://localhost:8081/api/health](http://localhost:8081/api/health)

To stop containers:
```bash
docker-compose down
```

---

## 📖 API Documentation (Swagger)

Swagger UI is available at: [http://localhost:8081/api-docs](http://localhost:8081/api-docs)

### 🔑 Using JWT in Swagger
1. Login using `/api/auth/login`
2. Copy the `accessToken`
3. Click **Authorize 🔒**
4. Paste: `Bearer <your_token>`

---

## 🧪 Sample API Flow
- **Register User**: `POST /api/auth/register`
- **Login**: `POST /api/auth/login`
- **Get Users (ADMIN)**: `GET /api/users`
- **Create Customer (ADMIN)**: `POST /api/customers`
- **Create Task (ADMIN)**: `POST /api/tasks`

---

## ❗ Error Handling

| Status Code | Description |
|---|---|
| 400 | Validation error |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Resource not found |
| 409 | Duplicate resource |
| 500 | Internal server error |

---

## ✅ Assignment Requirements Covered

- JWT Authentication
- Role-based Authorization
- Prisma ORM with PostgreSQL
- DTO Validation
- Swagger API Documentation
- Dockerized Backend
- PostgreSQL via Docker
- Health Check Endpoint
