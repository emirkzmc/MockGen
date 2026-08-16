# MockGen - Server (Backend)

This project constitutes the backend (server) side of the MockGen application. It is developed using NestJS for a robust and scalable architecture.

## Tech Stack

- **Framework:** [NestJS 11](https://nestjs.com/)
- **Language:** TypeScript
- **Database Driver:** PostgreSQL (`pg`)
- **Authentication:** JWT (`@nestjs/jwt`) & bcrypt
- **Mocking:** [@faker-js/faker](https://fakerjs.dev/)

## Getting Started

Follow the steps below to run the project in your local environment.

### Prerequisites

- Node.js (v20 or higher recommended)
- PostgreSQL Database
- Docker (Optional, but recommended for database setup)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Copy the `.env.example` file to create a `.env` file and fill in the necessary variables such as database credentials.

```bash
cp .env.example .env
```

### Database (PostgreSQL)

If Docker is installed, you can spin up the database using the `docker-compose.yml` (in the root directory) or use your own local PostgreSQL server.
You can review the `init.sql` file for the required table structures or initial data.

### Running the Application

```bash
# Development mode (watch mode enabled)
npm run start:dev

# Standard execution
npm run start

# Production mode (must be built first)
npm run build
npm run start:prod
```

## Project Structure

The modular structure of NestJS is adopted. Each feature is grouped within its own module (Controller, Service, Entity/DTO).

- `src/`: The main directory containing the source code.
  - Features are generally organized into module folders (e.g., `auth`, `users`, etc.)
- `init.sql`: The SQL script used to create the database schema or initial mock data.

## Tests

You can use the following commands to test the project:

```bash
# Unit tests
npm run test

# End-to-end (e2e) tests
npm run test:e2e

# Test coverage report
npm run test:cov
```

## Code Standards

This project is developed under the general architecture rules (`AGENTS.md`). Follow NestJS best practices:
- Use Dependency Injection.
- Controllers should be kept as thin as possible; business logic should reside in the Service layer.
- Ensure you use ConfigModule for environment variables.
