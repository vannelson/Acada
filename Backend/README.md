# ProjectPrisma

Backend project using **Prisma**, **TypeScript**, and **Express.js**.

## Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/your-repo/projectprisma.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Commands

- **Merge Prisma Models**:  
   ```bash
   npm run prisma:merge
   ```

- **Run Migrations**:  
   ```bash
   npm run prisma:migrate
   ```

- **Generate Prisma Client**:  

   ```bash
   npm run prisma:generate
   ```

- **Seed Database**:  
   ```bash
   npm run prisma:seed
   ```

## Endpoints

- **Pagination Example**:  
   Request:  
   ```bash
   GET http://localhost:8000/api/projects/?page=8&limit=2&filter[name]=Frozen
   ```

- **Create User**:  
   Request:  
   ```bash
   POST http://localhost:8000/api/auths/register
   ```
   Body:  
   ```json
   {
     "email": "admin@gmail.com",
     "password": "123456",
     "name": "Van Nelson"
   }
   ```

- **Bearer Token**:  
   Include `Authorization: Bearer <token>` in request headers for protected routes.

