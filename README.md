# Polling App

This is a simple real-time polling app built with **Next.js (App Router)**, **Prisma**, and **a serverless database**. Users can create polls, vote on them, and see results updating in real-time.

## Features
- Create a poll with a question and multiple options.
- Vote on a poll.
- View real-time poll results (auto-refresh every second).
- Fully deployed using **Vercel**.

## Tech Stack
- **Next.js (App Router)** – Full-stack React framework.
- **Prisma** – ORM for database interactions.
- **Neon PostgreSQL** – Serverless database.
- **Vercel** – Deployment and hosting.

---

## API Endpoints

### **1. Fetch All Polls**
#### **GET /api/polls**
Returns all polls with their options.
##### **Response:**
```json
[
  {
    "id": 1,
    "question": "What is your favorite color?",
    "options": [
      { "id": 1, "text": "Red", "votes": 10 },
      { "id": 2, "text": "Blue", "votes": 5 }
    ]
  }
]
```

### **2. Create a New Poll**
#### **POST /api/polls**
##### **Request Body:**
```json
{
  "question": "What is your favorite color?",
  "options": ["Red", "Blue", "Green"]
}
```
##### **Response:**
```json
{
  "id": 2,
  "question": "What is your favorite color?",
  "options": [
    { "id": 3, "text": "Red", "votes": 0 },
    { "id": 4, "text": "Blue", "votes": 0 },
    { "id": 5, "text": "Green", "votes": 0 }
  ]
}
```

### **3. Vote on a Poll Option**
#### **POST /api/vote**
##### **Request Body:**
```json
{
  "optionId": 3
}
```
##### **Response:**
```json
{
  "id": 3,
  "text": "Red",
  "votes": 11
}
```

---

## Database Schema (Prisma)
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Poll {
  id       Int      @id @default(autoincrement())
  question String
  options  Option[]
}

model Option {
  id     Int    @id @default(autoincrement())
  text   String
  votes  Int    @default(0)
  poll   Poll   @relation(fields: [pollId], references: [id])
  pollId Int
}
```

---

## How It Works
1. **User creates a poll** – The frontend sends a **POST request** to `/api/polls`.
2. **Poll is stored in the database** – Prisma handles storing the poll and its options in **PostgreSQL**.
3. **Users vote on a poll** – The frontend sends a **POST request** to `/api/vote` with the selected option ID.
4. **Votes update in real-time** – The frontend polls the API every second to fetch updated results.
5. **Deployment on Vercel** – The app is deployed and works without any manual database configuration.

---

## Deployment Instructions
1. **Push Code to GitHub**
2. **Deploy on Vercel**
   - Import project.
   - Click "Add Database" → Select **Neon PostgreSQL**.
   - Vercel will auto-configure `DATABASE_URL`.

---

## Environment Variables
| Variable       | Description             |
|---------------|-------------------------|
| `DATABASE_URL` | Connection string for Neon PostgreSQL |

---

## License
MIT License
