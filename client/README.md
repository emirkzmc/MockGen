# MockGen - Client (Frontend)

This project constitutes the frontend (client) side of the MockGen application. It is developed using modern React and Next.js practices.

## 🛠 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **UI Library:** [React 19](https://react.dev/)
- **Styling & Design:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Data Fetching:** [TanStack React Query](https://tanstack.com/query/latest) & [Axios](https://axios-http.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Mocking:** [@faker-js/faker](https://fakerjs.dev/)

## Getting Started

Follow the steps below to run the project in your local environment.

### Prerequisites

- Node.js (v20 or higher recommended)
- npm or yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Copy the `.env.example` file to create a `.env` or `.env.local` file and fill in the required variables.

```bash
cp .env.example .env.local
```

### Starting the Development Server

You can start the project in development mode with the following command:

```bash
npm run dev
```

The application will be running at [http://localhost:3000](http://localhost:3000).

## Project Structure

The project generally follows a feature-sliced or standard Next.js App Router structure. Please make sure to read the `AGENTS.md` (Codex Engineering Rules) file in the root directory of the project. All architectural decisions must be made according to these rules.

- `src/app`: Pages and route definitions.
- `src/components`: Reusable UI components.
- `src/api`: Axios interceptors and API call functions.
- `src/hooks`: Custom React hooks.
- `src/types`: TypeScript interfaces and types.

## Architecture and Code Standards

This project adopts **SOLID principles**, **Atomic Design**, and **Feature-Sliced Design**:

- Components must have a Single Responsibility.
- API calls should not be made directly from components (using `fetch` or `axios`), but should be extracted to the `src/api` layer and consumed via Hooks (e.g., `useQuery`).
- Use consistent utility classes when writing styles with Tailwind CSS.
- Refer to the `AGENTS.md` file in the root directory for detailed developer guidelines.

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the project for production.
- `npm run start`: Starts the compiled project in production mode.
- `npm run lint`: Runs code analysis with ESLint.
