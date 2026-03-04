# Quiz Platform

A full-stack web application for creating and taking quizzes.  
Built with **React + Vite** (frontend), **Node.js + Express + Prisma** (backend), and **MySQL** (database).

---

## Features
- User registration and login with JWT authentication
- Admin can create quizzes and questions
- Users can take quizzes and see results
- Track quiz scores and history
- Responsive design

---

## Tech Stack
- Frontend: React + Vite, Axios, React Router
- Backend: Node.js, Express, Prisma ORM
- Database: MySQL
- Authentication: JWT, bcrypt

---

## Folder Structure
quiz-platform/
├─ backend/
│  ├─ routes/
│  ├─ controllers/
│  ├─ prisma/
│  ├─ server.js
│  └─ prismaClient.js
├─ frontend/
│  ├─ src/
│  ├─ vite.config.js
│  └─ package.json
└─ .gitignore