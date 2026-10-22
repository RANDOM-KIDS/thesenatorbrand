# Project Setup

Stack: Next.js, TypeScript, PostgreSQL, Drizzle ORM, npm, Docker

## Setup Steps

1. Clone the repository and install dependencies:

   ```bash
   npm install
   ```

2. Set up environment variables. Copy `.env.example` to `.env`, or decrypt your production environment variables using dotenvx. Copy .env.example to .env for local plaintext configuration, or if your environment variables are encrypted using dotenvx, obtain your decryption key from moi. Set the DOTENV_PRIVATE_KEY environment variable locally or ensure your .env.keys file is placed securely in the project root. Never commit your .env.keys file to version control.

3. Start services locally using Docker:

   ```bash
   docker compose up -d --build
   ```

4. Run database migrations:

   ```bash
   npm run db:migrate
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

## Commands

- `npm run dev` - Starts the local development server.
- `npm run build` - Builds the application for production.
- `npm run start` - Starts the production server.
- `npm run lint` - Runs ESLint.
- `npm run db:generate` - Generates Drizzle ORM migrations.
- `npm run db:migrate` - Executes database migrations.
- `npm run db:studio` - Opens Drizzle Studio.

## Folder Structure

thesenatorbrand/
└── src/
├── app/
│ ├── api/
│ └── api-docs/ So I would do all this
├── db/
└── lib/

- `src/app` - Next.js App Router pages, layouts, and API endpoints.
- `src/db` - Drizzle configuration, database schema definitions, and migration execution scripts.
- `drizzle` - Generated SQL migration files.
