# Contributing to TaskFlow

Thank you for your interest in contributing to TaskFlow.

TaskFlow is an open-source project created and maintained by [Youssef Shaaban](https://www.linkedin.com/in/imdevyoussefshaaban/). Contributions from the community are welcome and help improve the project for everyone.

Before contributing, please take a moment to understand the project's development guidelines and contribution process.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Before You Start](#before-you-start)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Making Changes](#making-changes)
- [Commit Guidelines](#commit-guidelines)
- [Pull Requests](#pull-requests)
- [Bug Reports](#bug-reports)
- [Feature Requests](#feature-requests)
- [Code Quality](#code-quality)
- [Database Changes](#database-changes)
- [Review Process](#review-process)
- [Ownership and Licensing](#ownership-and-licensing)

---

## Code of Conduct

Please read and follow the project's [Code of Conduct](CODE_OF_CONDUCT.md).

Contributors are expected to communicate respectfully and constructively.

---

## Before You Start

Before opening an issue or pull request:

1. Check existing issues and pull requests.
2. Make sure the change has not already been proposed.
3. For significant changes, open an issue first to discuss the proposed approach.
4. Keep changes focused and related to the purpose of the contribution.

For larger architectural changes, discussion with the project maintainer before implementation is strongly recommended.

---

## Development Setup

### Prerequisites

Make sure you have:

- Node.js 20+
- npm
- Git
- A PostgreSQL database

A development PostgreSQL database can be hosted using Neon or another PostgreSQL provider.

### Clone the repository

```bash
git clone https://github.com/devyoussefshaaban/taskflow.git

cd taskflow
```

### Backend

```bash
cd backend

npm install

cp .env.example .env
```

Configure the required environment variables before starting the backend.

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

### Frontend

In another terminal:

```bash
cd frontend

npm install

cp .env.example .env.local

npm run dev
```

Refer to the main [README](README.md) for the latest setup instructions.

---

## Project Structure

TaskFlow is divided into separate frontend and backend applications.

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
│   └── prisma/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── features/
│   ├── hooks/
│   └── lib/
│
├── docs/
└── .github/
```

When adding functionality, place code within the appropriate domain or feature rather than creating unrelated global modules.

---

## Making Changes

When working on a contribution:

1. Create a new branch from the latest `main`.
2. Make the smallest reasonable change.
3. Keep the implementation consistent with the existing architecture.
4. Add or update tests where appropriate.
5. Run formatting and linting checks.
6. Update documentation when the behavior or API changes.
7. Commit your changes using a clear commit message.

Create a branch using a descriptive name:

```bash
git checkout -b feature/project-members
```

Examples:

```text
feature/task-labels
feature/project-members
fix/task-assignment
fix/authentication-validation
docs/api-documentation
refactor/task-service
```

---

## Commit Guidelines

TaskFlow follows a Conventional Commits-inspired format.

```text
<type>: <description>
```

Common types include:

| Type       | Usage                                       |
| ---------- | ------------------------------------------- |
| `feat`     | New functionality                           |
| `fix`      | Bug fix                                     |
| `refactor` | Code restructuring without behavior changes |
| `docs`     | Documentation changes                       |
| `test`     | Adding or updating tests                    |
| `chore`    | Maintenance and tooling                     |
| `perf`     | Performance improvements                    |

Examples:

```bash
git commit -m "feat: add project member management"
```

```bash
git commit -m "fix: prevent unauthorized task updates"
```

```bash
git commit -m "docs: update API setup instructions"
```

Keep commit messages concise and focused on the change.

---

## Pull Requests

Before opening a pull request:

- Make sure your branch is up to date with `main`.
- Make sure the project builds successfully.
- Run relevant tests.
- Run linting and formatting checks.
- Review your own changes.
- Remove debugging code and unnecessary changes.
- Update documentation when necessary.

### Pull request title

Use a clear and descriptive title.

Good:

```text
feat: add project member management
```

Avoid:

```text
Update
```

or:

```text
Changes
```

### Pull request description

Please explain:

- What changed
- Why the change was needed
- How it was implemented
- How it was tested
- Any relevant limitations or follow-up work

For example:

```markdown
## Summary

Adds project member management with owner and member roles.

## Changes

- Added ProjectMember Prisma model
- Added member management endpoints
- Added authorization checks
- Added validation for duplicate memberships

## Testing

- Tested project member creation
- Tested duplicate membership handling
- Tested unauthorized access
```

---

## Bug Reports

When reporting a bug, provide enough information to reproduce it.

Include:

- A clear description
- Steps to reproduce
- Expected behavior
- Actual behavior
- Relevant API request/response
- Environment information
- Screenshots or logs when useful

Please remove passwords, tokens, API keys, database credentials, and other sensitive information before submitting an issue.

---

## Feature Requests

Feature requests are welcome.

Before proposing a feature, consider:

- What problem does it solve?
- Who would benefit from it?
- How does it fit TaskFlow's existing architecture?
- Is it consistent with the project's scope?

For larger features, open an issue first so the proposed approach can be discussed before implementation.

---

## Code Quality

Contributions should prioritize:

- Type safety
- Readability
- Maintainability
- Separation of concerns
- Clear naming
- Small and focused functions
- Reusable components
- Appropriate error handling
- Input validation

Avoid introducing unnecessary abstractions or dependencies.

Prefer simple solutions when they adequately solve the problem.

---

## Backend Guidelines

The backend is built with NestJS, Prisma, and PostgreSQL.

When contributing backend functionality:

- Keep business logic inside appropriate services.
- Keep controllers focused on HTTP concerns.
- Use DTOs for request validation.
- Use Prisma through the appropriate database layer.
- Validate external input.
- Handle authorization explicitly.
- Avoid exposing sensitive information through API responses.
- Keep modules organized by domain.

Example:

```text
projects/
├── projects.controller.ts
├── projects.service.ts
├── projects.module.ts
├── dto/
└── ...
```

---

## Frontend Guidelines

The frontend is built with Next.js, React, TypeScript, Tailwind CSS, and React Query.

When contributing frontend functionality:

- Keep components focused.
- Prefer reusable components where appropriate.
- Keep server-state management in React Query.
- Avoid unnecessary global state.
- Keep API communication separate from presentation components.
- Maintain responsive layouts.
- Follow the existing design system and component patterns.

---

## Database Changes

Database changes require additional care because they can affect existing data.

When modifying the Prisma schema:

1. Update `schema.prisma`.
2. Create an appropriate migration.
3. Test the migration locally.
4. Verify affected queries and relationships.
5. Update seed data if necessary.
6. Document significant schema changes.

Example:

```bash
npx prisma migrate dev --name add_task_labels
```

Do not manually modify the production database as part of a pull request.

---

## API Changes

When changing an existing API:

- Consider backward compatibility.
- Update validation.
- Update API documentation.
- Update frontend consumers where necessary.
- Add or update tests.
- Clearly document breaking changes.

Avoid changing existing API behavior without explaining the reason in the pull request.

---

## Testing

Contributors should test changes before submitting a pull request.

At minimum, verify:

- The application starts successfully.
- The affected functionality works as expected.
- Existing functionality has not been unintentionally broken.
- Relevant validation and error cases work correctly.

As the automated test suite grows, contributors should add tests for new business logic and important edge cases.

---

## Review Process

All pull requests are subject to review.

The maintainer may request:

- Code changes
- Additional tests
- Documentation updates
- Architectural adjustments
- Changes to naming or project structure

A pull request may be declined if it:

- Introduces unnecessary complexity
- Conflicts with the project's direction
- Breaks existing functionality
- Introduces security concerns
- Does not follow the project's architecture
- Falls outside the project's intended scope

The goal of review is to maintain the quality, consistency, and long-term maintainability of TaskFlow.

---

## Ownership and Licensing

TaskFlow is an open-source project created and originally developed by [Youssef Shaaban](https://www.linkedin.com/in/imdevyoussefshaaban/).

The project is licensed under the [MIT License](LICENSE).

Contributing to TaskFlow does not transfer ownership of the existing project or its original source code.

By submitting a contribution, you agree that your contribution will be made available under the project's applicable open-source license.

Contributors retain any rights they may have in their original contributions, subject to the permissions granted under the project's license and applicable law.

For substantial contributions or changes involving ownership, licensing, trademarks, or commercial use, additional written agreements may be required.

---

## Maintainer

**[Youssef Shaaban](https://www.linkedin.com/in/imdevyoussefshaaban/)**

- LinkedIn: [Youssef Shaaban](https://www.linkedin.com/in/imdevyoussefshaaban/)
- Portfolio: [devyoussefshaaban.vercel.app](https://devyoussefshaaban.vercel.app/)
- GitHub: [devyoussefshaaban](https://github.com/devyoussefshaaban)
- Email: [imdevyoussef@gmail.com](mailto:imdevyoussef@gmail.com)
- WhatsApp: [+20 12 8153 4401](https://wa.me/201281534401)

---

## Thank You

Thank you for contributing to TaskFlow.

Whether you are fixing a bug, improving documentation, proposing an idea, or adding a new feature, your contribution is appreciated.

Please keep the project focused, maintainable, and welcoming to other developers.
