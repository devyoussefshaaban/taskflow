# 🚀 TaskFlow

### Open-source project & task management platform

> 🟢 **Open Source · Actively Developed · Contributions Welcome**

TaskFlow is a modern full-stack project management platform designed to help individuals and teams organize projects, manage tasks, collaborate with team members, and track work from a centralized workspace.

Built with **NestJS, Prisma, PostgreSQL, Next.js, React, and TypeScript**, TaskFlow focuses on practical backend architecture, relational data modeling, RESTful API design, validation, authentication, and maintainable full-stack development.

> **TaskFlow is an open-source project created and maintained by [Youssef Shaaban](https://www.linkedin.com/in/imdevyoussefshaaban/).**

---

## 🟢 Open Source & Actively Developed

TaskFlow is an **open-source project under active development**.

The project is being built incrementally with a focus on:

- 🧱 Scalable architecture
- 🔐 Authentication & authorization
- 🗄️ Relational database design
- 🧩 Modular backend architecture
- 🔌 RESTful API design
- ✅ Input validation
- 🧪 Automated testing
- 🎨 Modern frontend development
- 📈 Performance and maintainability

Contributions, ideas, feedback, and discussions are welcome.

> ⭐ **If you find TaskFlow useful or interesting, consider starring the repository and following the project as it evolves.**

---

## ✨ Features

### 👤 Authentication & Users

- User registration and authentication
- Authorization and role management
- User profiles
- Project ownership
- Team membership

### 📁 Project Management

- Create and manage projects
- Project members
- Project-level roles
- Project lifecycle status
- Project dashboards

### ✅ Task Management

- Create, update, and delete tasks
- Task assignment
- Task priorities
- Task statuses
- Due dates
- Filtering and sorting
- Pagination
- Search

### 💬 Collaboration

- Task comments
- Team collaboration
- Project discussions

### 🎯 Planned

- Kanban board
- Activity logs
- Notifications
- File attachments
- Task labels
- Real-time updates
- Background jobs
- CI/CD
- Production deployment

---

# 🛠️ Technology Stack

## Backend

| Technology        | Purpose                    |
| ----------------- | -------------------------- |
| 🟢 **NestJS**     | Backend framework          |
| 🔷 **TypeScript** | Application language       |
| 🟣 **Prisma**     | ORM & database toolkit     |
| 🐘 **PostgreSQL** | Relational database        |
| ☁️ **Neon**       | Managed PostgreSQL hosting |

## Frontend

| Technology          | Purpose                 |
| ------------------- | ----------------------- |
| ▲ **Next.js**       | React framework         |
| ⚛️ **React**        | UI library              |
| 🔷 **TypeScript**   | Application language    |
| 🎨 **Tailwind CSS** | Styling                 |
| 🔄 **React Query**  | Server-state management |

## Development & Tooling

| Technology      | Purpose                        |
| --------------- | ------------------------------ |
| 🐙 **Git**      | Version control                |
| 🐙 **GitHub**   | Source control & collaboration |
| 🔍 **ESLint**   | Code quality                   |
| ✨ **Prettier** | Code formatting                |

---

# 🏗️ Architecture

TaskFlow follows a separated frontend/backend architecture.

```text
┌─────────────────────────────────────┐
│              Frontend               │
│      Next.js + React + TypeScript   │
└──────────────────┬──────────────────┘
                   │
                   │ REST API
                   ▼
┌─────────────────────────────────────┐
│               Backend               │
│       NestJS + TypeScript           │
└──────────────────┬──────────────────┘
                   │
                   │ Prisma
                   ▼
┌─────────────────────────────────────┐
│             PostgreSQL              │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│                Neon                 │
└─────────────────────────────────────┘
```

### 📂 Repository Structure

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
├── .github/
├── LICENSE
├── README.md
└── .gitignore
```

The project is organized around business domains so that each feature can encapsulate its own controllers, services, DTOs, validation, business logic, and database operations.

---

# 🧩 Core Domain

TaskFlow currently revolves around five primary entities.

### 👤 User

Represents an authenticated application user.

Users can:

- Own projects
- Join projects
- Be assigned tasks
- Write comments

### 📁 Project

Represents a workspace containing a collection of tasks.

A project has:

- An owner
- Members
- Tasks
- A lifecycle status

### 👥 Project Member

Represents a user's membership in a project.

`ProjectMember` acts as the join entity between users and projects and supports project-level roles.

### ✅ Task

Represents a unit of work inside a project.

Tasks support:

- Title
- Description
- Status
- Priority
- Assignee
- Due date
- Comments

### 💬 Comment

Represents a discussion attached to a task.

Each comment belongs to:

- A task
- The user who created it

---

# 🗄️ Database

TaskFlow uses **PostgreSQL** as its primary database and **Prisma** as the ORM.

The database emphasizes relational integrity, explicit relationships, and database-level constraints.

### 🔗 Primary Relationships

```text
User
 ├── owns ────────→ Projects
 ├── joins ────────→ Projects
 ├── assigned ────→ Tasks
 └── writes ──────→ Comments

Project
 ├── has ─────────→ Members
 └── contains ────→ Tasks

Task
 └── contains ────→ Comments
```

### Entity Relationships

```text
User 1 ─── N Project
User N ─── N Project
Project 1 ─── N Task
User 1 ─── N Task
Task 1 ─── N Comment
User 1 ─── N Comment
```

Detailed database documentation is available under:

```text
docs/
```

---

# ⚙️ Backend

The backend is built with **NestJS** and follows a modular architecture.

Each major business domain is represented by its own NestJS module.

```text
backend/src/

├── auth/
├── users/
├── projects/
├── tasks/
├── comments/
├── prisma/
└── common/
```

Each domain is responsible for its own:

- Controllers
- Services
- DTOs
- Validation
- Business rules
- Database operations

### 🔌 API Design

The backend exposes a RESTful API organized around resources.

```text
/api
├── auth
├── users
├── projects
├── tasks
└── comments
```

### 🔐 Authentication

```http
POST /auth/register
POST /auth/login
GET  /auth/me
```

### 📁 Projects

```http
POST   /projects
GET    /projects
GET    /projects/:id
PATCH  /projects/:id
DELETE /projects/:id
```

### ✅ Tasks

```http
POST   /projects/:projectId/tasks
GET    /projects/:projectId/tasks
GET    /tasks/:id
PATCH  /tasks/:id
DELETE /tasks/:id
```

### 💬 Comments

```http
POST   /tasks/:taskId/comments
GET    /tasks/:taskId/comments
DELETE /comments/:id
```

---

# 💻 Frontend

The frontend is built with **Next.js, React, TypeScript, and Tailwind CSS**.

React Query handles server-state management and communication with the backend API.

The frontend is responsible for:

- 🔐 Authentication
- 📊 Project dashboards
- 📁 Project management
- ✅ Task management
- 👥 Team management
- 🔎 Task filtering and sorting
- 💬 Comments
- 📱 Responsive interfaces

The frontend communicates exclusively with the NestJS API and does not access the database directly.

---

# 🚀 Getting Started

## Prerequisites

Make sure you have:

- Node.js 20+
- npm
- Git
- PostgreSQL database

A hosted PostgreSQL provider such as Neon can be used for development.

---

## 📥 Clone the Repository

```bash
git clone https://github.com/devyoussefshaaban/taskflow.git

cd taskflow
```

---

# 🔧 Backend Setup

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

Configure your environment variables:

```env
DATABASE_URL="your-postgresql-connection-string"
JWT_SECRET="your-secret-key"
PORT=3000
```

Generate the Prisma client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev
```

Start the development server:

```bash
npm run start:dev
```

Backend:

```text
http://localhost:3000
```

---

# 🎨 Frontend Setup

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

Frontend:

```text
http://localhost:3001
```

---

# 🔐 Environment Variables

### Backend

```env
DATABASE_URL=
JWT_SECRET=
PORT=3000
```

### Frontend

```env
NEXT_PUBLIC_API_URL=
```

> ⚠️ **Never commit `.env`, `.env.local`, or other files containing secrets.**

Use the provided `.env.example` files as templates.

---

# 🗺️ Roadmap

TaskFlow is being developed incrementally.

## 🏗️ Phase 1 — Foundation

- [x] Project initialization
- [x] Repository structure
- [ ] Database schema
- [ ] Prisma integration
- [ ] Authentication
- [ ] User management

## 🚀 Phase 2 — Core Features

- [ ] Project CRUD
- [ ] Project membership
- [ ] Project roles
- [ ] Task CRUD
- [ ] Task assignment
- [ ] Task statuses
- [ ] Task priorities
- [ ] Due dates
- [ ] Comments

## ⚡ Phase 3 — API Improvements

- [ ] Pagination
- [ ] Filtering
- [ ] Sorting
- [ ] Search
- [ ] Authorization improvements
- [ ] API documentation
- [ ] Automated testing

## 🎨 Phase 4 — Frontend

- [ ] Authentication interface
- [ ] Dashboard
- [ ] Project management
- [ ] Task management
- [ ] Kanban board
- [ ] Team management
- [ ] Comments
- [ ] Responsive UI

## 🔮 Phase 5 — Advanced Features

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

# 🤝 Contributing

TaskFlow is open source and contributions are welcome.

Before contributing, please review:

- `CONTRIBUTING.md`
- `CODE_OF_CONDUCT.md`
- `LICENSE`

### Contribution Workflow

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Run tests and quality checks
5. Commit your changes
6. Push your branch
7. Open a Pull Request

Example:

```bash
git checkout -b feature/project-members
```

Use clear and descriptive commit messages:

```bash
git commit -m "feat: add project member management"
```

Please keep pull requests focused and consistent with the project's architecture.

---

# 📄 License

Copyright © 2026 **Youssef Shaaban**.

TaskFlow is licensed under the **MIT License**.

See [`LICENSE`](./LICENSE) for the complete license text.

The MIT License allows users to use, modify, and distribute the software subject to its terms.

---

# 👨‍💻 Maintainer

### Youssef Shaaban

Senior Software Engineer focused on building reliable, scalable, and user-centered digital products.

|                  |                                                                       |
| ---------------- | --------------------------------------------------------------------- |
| 💼 **LinkedIn**  | [Youssef Shaaban](https://www.linkedin.com/in/imdevyoussefshaaban/)   |
| 🌐 **Portfolio** | [devyoussefshaaban.vercel.app](https://devyoussefshaaban.vercel.app/) |
| 🐙 **GitHub**    | [devyoussefshaaban](https://github.com/devyoussefshaaban)             |
| 📧 **Email**     | [imdevyoussef@gmail.com](mailto:imdevyoussef@gmail.com)               |
| 💬 **WhatsApp**  | [+20 12 8153 4401](https://wa.me/201281534401)                        |

---

# 🙌 Acknowledgements

TaskFlow is built on the work of the open-source communities behind:

**TypeScript · NestJS · React · Next.js · Prisma · PostgreSQL · Tailwind CSS**

A huge thanks to everyone contributing to the ecosystem that makes projects like TaskFlow possible.

---

# ⭐ Support the Project

If TaskFlow is useful to you:

⭐ **Star the repository**

🐛 **Report bugs**

💡 **Suggest features**

🤝 **Contribute**

💬 **Start a discussion**

Every contribution and piece of feedback helps the project grow.

---

<div align="center">

### 🚀 TaskFlow

**Plan. Organize. Collaborate. Deliver.**

🟢 **Open Source · Actively Developed · Contributions Welcome**

Created and maintained by **[Youssef Shaaban](https://www.linkedin.com/in/imdevyoussefshaaban/)**

</div>
