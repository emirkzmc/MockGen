# MockGen

MockGen is an enterprise-grade, highly modular SaaS platform designed for creating and managing mock API endpoints and data schemas. It allows developers to quickly generate dynamic RESTful APIs without writing any backend code, making it the perfect tool for frontend development, testing, and prototyping.

##  Features

- **Decoupled Architecture**: Separation of concerns between Data Models (`Schemas`) and API Routes (`Endpoints`). Create a model once, use it across multiple endpoints.
- **Dynamic Mock Generation**: Powerful mock data generation engine powered by `faker.js`. Supports recursive arrays, nested objects, and a wide variety of primitive types (UUID, Email, Full Name, Date, etc.).
- **Live Preview Engine**: See your generated mock data in real-time as you build your schemas.
- **Strict Typing & Clean Code**: Built with a strict adherence to SOLID principles and Clean Code guidelines. 
- **Dark Mode Native**: A beautifully crafted, premium UI with a native dark mode experience (crimson red accents and glassmorphism elements).
- **JWT Authentication**: Secure user management and isolated workspaces for different users.
- **Log & Analytics Tracking**: Monitor requests hitting your generated mock endpoints in real-time.

##  Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router) + Turbopack
- **State & Cache Management**: TanStack Query (React Query) utilizing a robust Query Key Factory for precise cache invalidations.
- **API Architecture**: Domain-Driven Design (DDD). Models reside in `domain/` folder, while `api/` folder contains strictly separated, single-responsibility modules (`schemaApi.ts`, `endpointApi.ts`) exporting individual async functions.
- **Styling**: Tailwind CSS (Strict Dark Mode)
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

### Backend
- **Framework**: NestJS
- **Language**: TypeScript (Strict mode, no `any`, zero-comment policy)
- **Database**: PostgreSQL (Raw SQL queries via `pg` module - No ORM used for maximum performance and explicit control).
- **Authentication**: Passport-JWT

##  Architecture Highlights

### The "Decoupled Flow"
MockGen uses a modular decoupled flow approach:
1. **Schemas (`/schemas`)**: The Data Model factory. Here you define the shape of your data (e.g., `User Model`, `Product Schema`) without worrying about where it will be served.
2. **Endpoints (`/endpoints`)**: The Route factory. You define a path (e.g., `/api/v1/users`), select an HTTP method, map it to a previously created Schema, and define how many mock items it should return.

### Raw SQL Strategy
The backend intentionally avoids ORMs (like Prisma or TypeORM) to enforce strict control over query execution and schema management. All database operations are handled via a custom `DatabaseStorageService` implementing standard `IStorage` contracts.

##  Getting Started

### Prerequisites
- Node.js (v18+)
- Docker & Docker Compose (for PostgreSQL)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/emirkzmc/MockGen.git
   cd MockGen
   ```

2. **Start the Database**
   Run the PostgreSQL instance using Docker Compose:
   ```bash
   docker-compose up -d
   ```
   *Note: On first boot, `init.sql` will automatically create the required `users`, `schemas`, `endpoints`, and `logs` tables.*

3. **Install Dependencies**
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

4. **Environment Variables**
   `.env.example` templates are provided in both the `client` and `server` directories. Copy them to create your `.env` files:
   ```bash
   # Server
   cp server/.env.example server/.env
   
   # Client
   cp client/.env.example client/.env
   ```

5. **Start Development Servers**
   ```bash
   # In the server directory
   npm run start:dev

   # In the client directory
   npm run dev
   ```

##  Project Guidelines

- **No `any` Types**: TypeScript strict mode is enforced. Unknown types must be handled with type guards.
- **State Management**: Redux is strictly forbidden. All asynchronous state and cache management is handled by TanStack Query.
- **Clean Architecture (SOLID)**: 
  - Monolithic API classes are prohibited. 
  - Each feature domain (Schema, Endpoint, Log) must reside in its own API file (e.g., `schemaApi.ts`). 
  - Types and API calls are separated into `domain/` and `api/` directories.
  - Endpoints strictly return pure domain responses without modifying UI state.
- **Design Language**: The UI uses a strict dark theme with crimson accents (`bg-black`, `border-white/10`, `text-[#810100]`). Light mode elements are not permitted.

