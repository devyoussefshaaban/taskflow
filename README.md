# TaskFlow

### Open-source project and task management platform

TaskFlow is a modern full-stack project management platform designed to help individuals and teams organize projects, manage tasks, collaborate with team members, and track work from a centralized workspace.

The project is built with a modern TypeScript-based stack and follows practical patterns for building scalable REST APIs, relational data models, and maintainable full-stack applications.

> **TaskFlow is an open-source project created and maintained by [Youssef Shaaban](https://www.linkedin.com/in/imdevyoussefshaaban/).**

---

## Overview

TaskFlow provides a structured workspace where users can create projects, organize tasks, assign work to team members, communicate through task comments, and track project progress.

The project is designed around a clear separation between the frontend application and backend API.

### Core capabilities

- User authentication and authorization
- Project management
- Project membership and roles
- Task management
- Task assignment
- Task priorities and statuses
- Due dates
- Task comments
- Filtering, sorting, and pagination
- Responsive project dashboard
- RESTful API
- Relational database architecture

---

## Technology Stack

### Backend

| Technology | Purpose                    |
| ---------- | -------------------------- |
| NestJS     | Backend framework          |
| TypeScript | Application language       |
| Prisma     | ORM and database toolkit   |
| PostgreSQL | Relational database        |
| Neon       | Managed PostgreSQL hosting |

### Frontend

| Technology   | Purpose                 |
| ------------ | ----------------------- |
| Next.js      | React framework         |
| React        | UI library              |
| TypeScript   | Application language    |
| Tailwind CSS | Styling                 |
| React Query  | Server-state management |

### Development & Tooling

| Technology | Purpose                          |
| ---------- | -------------------------------- |
| Git        | Version control                  |
| GitHub     | Source control and collaboration |
| ESLint     | Code quality                     |
| Prettier   | Code formatting                  |

---

## Architecture

TaskFlow follows a separated frontend/backend architecture.

```text
Frontend
Next.js + React + TypeScript
        │
        │ REST API
        ▼
Backend
NestJS + TypeScript
        │
        │ Prisma
        ▼
PostgreSQL
        │
        ▼
Neon
```

### Repository structure

```text
taskflow/
│
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── projects/
│   │   ├── tasks/
│   │   ├── comments/
│   │   ├── prisma/
│   │   └── common/
│   │
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   └── package.json
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── features/
│   ├── hooks/
│   ├── lib/
│   └── package.json
│
├── docs/
│
├── .github/
│
├── LICENSE
├── README.md
└── .gitignore
```

The project is organized by domain to keep business logic isolated, maintainable, and easier to extend as the application grows.

---

# Core Domain

TaskFlow currently revolves around five primary entities:

### User

Represents an authenticated application user.

Users can:

- Own projects
- Join projects
- Be assigned tasks
- Write comments

### Project

Represents a workspace containing a collection of tasks.

A project has:

- An owner
- Members
- Tasks
- A lifecycle status

### Project Member

Represents a user's membership in a project.

This entity handles the many-to-many relationship between users and projects and allows project-level roles to be introduced.

### Task

Represents a unit of work inside a project.

Tasks support:

- Title
- Description
- Status
- Priority
- Assignee
- Due date
- Comments

### Comment

Represents a discussion attached to a task.

Comments belong to both:

- A task
- The user who created the comment

---

# Database

TaskFlow uses **PostgreSQL** as its primary database and **Prisma** as the ORM.

The database is designed around relational integrity and explicit relationships rather than storing application state as unstructured data.

### Primary relationships

```text
User
 ├── owns → Projects
 ├── joins → Projects
 ├── assigned → Tasks
 └── writes → Comments

Project
 ├── has → Members
 └── contains → Tasks

Task
 └── contains → Comments
```

### Entity relationships

```text
User 1 ─── N Project
User N ─── N Project
Project 1 ─── N Task
User 1 ─── N Task
Task 1 ─── N Comment
User 1 ─── N Comment
```

The `ProjectMember` entity acts as the join entity between `User` and `Project`.

Detailed database documentation can be found under:

```text
docs/
```

---

# Backend

The backend is built with **NestJS** and follows a modular architecture.

Each major business domain is represented by its own NestJS module.

```text
backend/src/

auth/
users/
projects/
tasks/
comments/
prisma/
common/
```

This structure allows each domain to encapsulate its:

- Controllers
- Services
- DTOs
- Validation
- Business logic
- Database operations

### API design

The backend exposes a RESTful API organized around resources.

```text
/api
├── auth
├── users
├── projects
├── tasks
└── comments
```

Example endpoints:

### Authentication

```http
POST /auth/register
POST /auth/login
GET  /auth/me
```

### Projects

```http
POST   /projects
GET    /projects
GET    /projects/:id
PATCH  /projects/:id
DELETE /projects/:id
```

### Tasks

```http
POST   /projects/:projectId/tasks
GET    /projects/:projectId/tasks
GET    /tasks/:id
PATCH  /tasks/:id
DELETE /tasks/:id
```

### Comments

```http
POST   /tasks/:taskId/comments
GET    /tasks/:taskId/comments
DELETE /comments/:id
```

---

# Frontend

The frontend is built with **Next.js, React, TypeScript, and Tailwind CSS**.

React Query is used for server-state management and communication with the backend API.

The frontend is responsible for:

- Authentication flows
- Project dashboards
- Project management
- Task management
- Task assignment
- Task filtering and sorting
- Comments
- Responsive user interfaces

The frontend communicates with the NestJS API rather than directly accessing the database.

---

# Getting Started

## Prerequisites

Make sure you have the following installed:

- Node.js 20+
- npm
- Git
- PostgreSQL database

A hosted PostgreSQL database such as Neon can be used for development.

---

## Clone the repository

```bash
git clone https://github.com/devyoussefshaaban/taskflow.git

cd taskflow
```

---

# Backend Setup

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create your environment file:

```bash
cp .env.example .env
```

Configure the required environment variables:

```env
DATABASE_URL="your-postgresql-connection-string"
JWT_SECRET="your-secret-key"
PORT=3000
```

Generate the Prisma client:

```bash
npx prisma generate
```

Run the database migrations:

```bash
npx prisma migrate dev
```

Start the development server:

```bash
npm run start:dev
```

The API will be available at:

```text
http://localhost:3000
```

---

# Frontend Setup

Open a new terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create the environment file:

```bash
cp .env.example .env.local
```

Configure the API URL:

```env
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:3001
```

---

# Environment Variables

## Backend

```env
DATABASE_URL=
JWT_SECRET=
PORT=3000
```

## Frontend

```env
NEXT_PUBLIC_API_URL=
```

Environment files containing secrets must never be committed to the repository.

Use the provided `.env.example` files as templates.

---

# Development

The project is actively developed with a focus on:

- Type safety
- Clear separation of concerns
- Modular architecture
- Maintainable business logic
- Relational database design
- RESTful API principles
- Input validation
- Authentication and authorization
- Reusable frontend components
- Predictable server-state management

---

# Roadmap

TaskFlow is being developed incrementally.

## Phase 1 — Foundation

- [x] Project initialization
- [x] Repository structure
- [ ] Database schema
- [ ] Prisma integration
- [ ] Authentication
- [ ] User management

## Phase 2 — Core Features

- [ ] Project CRUD
- [ ] Project membership
- [ ] Project roles
- [ ] Task CRUD
- [ ] Task assignment
- [ ] Task statuses
- [ ] Task priorities
- [ ] Due dates
- [ ] Comments

## Phase 3 — API Improvements

- [ ] Pagination
- [ ] Filtering
- [ ] Sorting
- [ ] Search
- [ ] Authorization improvements
- [ ] API documentation
- [ ] Automated testing

## Phase 4 — Frontend

- [ ] Authentication interface
- [ ] Dashboard
- [ ] Project management
- [ ] Task management
- [ ] Kanban board
- [ ] Team management
- [ ] Comments
- [ ] Responsive UI

## Phase 5 — Advanced Features

- [ ] Activity logs
- [ ] Notifications
- [ ] File attachments
- [ ] Task labels
- [ ] Real-time updates
- [ ] Background jobs
- [ ] Docker support
- [ ] CI/CD
- [ ] Production deployment

---

# Contributing

TaskFlow is open source and contributions are welcome.

Before contributing, please review:

- `CONTRIBUTING.md`
- `CODE_OF_CONDUCT.md`
- `LICENSE`

### Contribution workflow

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Run the relevant tests and checks
5. Commit your changes
6. Push your branch
7. Open a Pull Request

Example:

```bash
git checkout -b feature/project-members
```

Commit using a clear message:

```bash
git commit -m "feat: add project member management"
```

Please keep pull requests focused and consistent with the existing architecture.

---

# Project Ownership

TaskFlow is an open-source project created and originally developed by **[Youssef Shaaban](https://www.linkedin.com/in/imdevyoussefshaaban/)**.

The project is publicly available to encourage learning, collaboration, experimentation, and community contributions.

Open-source availability does not remove the project's copyright. The source code is made available to others under the terms of the project's license.

The repository's `LICENSE` file defines the permissions and conditions under which the source code may be used, modified, and distributed.

For project governance and contribution ownership, please refer to the repository's contribution and licensing documentation.

---

# License

Copyright © 2026 **[Youssef Shaaban](https://www.linkedin.com/in/imdevyoussefshaaban/)**.

TaskFlow is licensed under the **MIT License**.

See the [`LICENSE`](./LICENSE) file for the complete license text.

The MIT License permits use, modification, distribution, and other activities subject to its terms. Copyright and license notices must be retained as required by the license.

For an open-source repository, the `LICENSE` file should be kept at the root of the project so GitHub and users can clearly identify the project's licensing terms.

---

# Maintainer

### [Youssef Shaaban](https://www.linkedin.com/in/imdevyoussefshaaban/)

Senior Software Engineer focused on building reliable, scalable, and user-centered digital products.

|               |                                                                       |
| ------------- | --------------------------------------------------------------------- |
| **LinkedIn**  | [Youssef Shaaban](https://www.linkedin.com/in/imdevyoussefshaaban/)   |
| **Portfolio** | [devyoussefshaaban.vercel.app](https://devyoussefshaaban.vercel.app/) |
| **GitHub**    | [devyoussefshaaban](https://github.com/devyoussefshaaban)             |
| **Email**     | [imdevyoussef@gmail.com](mailto:imdevyoussef@gmail.com)               |
| **WhatsApp**  | [+20 12 8153 4401](https://wa.me/201281534401)                        |

---

# Acknowledgements

TaskFlow is built using and inspired by the modern open-source ecosystem around TypeScript, NestJS, React, Next.js, Prisma, PostgreSQL, and related technologies.

The project would not exist without the work of the open-source communities behind these technologies.

---

## ⭐ Support the Project

If TaskFlow is useful to you, consider giving the repository a ⭐ on GitHub.

Contributions, feedback, bug reports, and feature discussions are welcome.

---

**TaskFlow — Plan. Organize. Collaborate. Deliver.**

Created and maintained by **[Youssef Shaaban](https://www.linkedin.com/in/imdevyoussefshaaban/)**.
