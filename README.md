## Ticket System Backend
Ticket System ใช้ Nest.js + TypeScript + Prisma ORM + PostgreSQL

## ✨Features
- CRUD Tickets
- Validation (title, descroption, priority, status)
```
GET /tickets → get list tickets
GET /tickets/:id → read detail tickets
POST /tickets → create ticket 
PATCH /tickets/:id → update ticket
DELETE /tickets/:id → delete ticket
```

## Install dependencies
```
npm install
```

## Create .env
```
DATABASE_URL="postgresql://username@localhost:5432/ticket_system"
PORT=4000
```
## Run Server
```
http://localhost:4000
```

## Create Database local (MacOS)
```
brew services list
brew services start postgresql@17
createdb -U username ticket_system
```
## Connect database postgresql
```
host: localhost
Port: 5432
database: ticket_system
username: username
```

## Prisma ORM
## Generate Prisma Client
```
npx prisma generate
```
## Migrate database
```
npx prisma migrate dev --name init
```
## [Optional] Check database on brownser
```
npx prisma studio
```

## 🚀 Getting Started
```
npm run start
```

## Structure
```
ticket-system--backend/
├── node_modules/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── prisma.service.ts
│   ├── tickets/
│   │   ├── dto/
│   │   │   ├── create-ticket.dto.ts
│   │   │   ├── update-ticket.dto.ts
│   │   │   └── find-ticket-dto.ts
│   │   ├── tickets.controller.ts
│   │   ├── tickets.service.ts
│   │   └── tickets.module.ts
├── package.json
├── tsconfig.json
├── .env
├── .gitignore
└── README.md
```
