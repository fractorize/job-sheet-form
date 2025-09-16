## Job Sheet Form

### Project Overview

Job Sheet Form is a full‑stack application to create, view, update, and manage job sheet reports. It provides a React frontend for data entry and browsing, and an Express/Node backend with MongoDB for persistence and validation.

### Tech Stack

- **Frontend**: React (Vite, TypeScript), React Router, Zustand (state), Zod (validation), Tailwind via `@tailwindcss/vite`
- **Backend**: Node.js, Express, TypeScript, Mongoose (MongoDB), Zod, dotenv, nodemon/ts-node

### Features

- **Create job sheet**: Submit a detailed job sheet with order and job details
- **List jobs**: View all saved job sheets
- **View job details**: Load a single job by ID
- **Update job**: Edit an existing job sheet
- **Delete job**: Remove a job sheet
- **Validation**: Zod validation on both client and server

### Project Structure

```
job-sheet-form/
  backend/   # Express + TypeScript API, MongoDB models, routes, controllers
  frontend/  # React + Vite app, components, pages, store, validations
```

- **`frontend`**: React app scaffolded with Vite. Contains UI components, pages, Zustand store (`src/store/useStore.ts`), and Zod schemas.
- **`backend`**: Express API with TypeScript. Contains MongoDB connection (`src/config/db.ts`), models, controllers, and routes.

### Installation & Setup

1. Clone the repository

```bash
git clone <repo-url>
cd job-sheet-form
```

2. Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend (in a separate terminal or after the backend)
cd ../frontend
npm install
```

3. Environment variables

- Backend `.env` (required) — create `backend/.env`:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/job_sheet_db
```

### Running the Project

Open two terminals (one for the backend, one for the frontend):

Backend (Express API):

```bash
cd backend
npm run build && npm run start
```

Frontend (Vite dev server):

```bash
cd frontend
npm run dev
```

### Ports

- **Backend**: `http://localhost:3000` (controlled by `PORT` in `backend/.env`)
- **Frontend**: Vite dev default (typically `http://localhost:5173`)
- The Vite dev server proxies requests starting with `/api` to the backend at `http://localhost:3000`.

### Build & Production

- Backend build/start:

```bash
cd backend
npm run build
npm start
```

- Frontend build/preview:

```bash
cd frontend
npm run build
npm run preview
```

### API Endpoints (reference)

Base URL: `http://localhost:3000/api/job`

| Method | Path   | Description      |
| ------ | ------ | ---------------- |
| POST   | `/`    | Create a new job |
| GET    | `/`    | List all jobs    |
| GET    | `/:id` | Get job by ID    |
| PUT    | `/:id` | Update job by ID |
| DELETE | `/:id` | Delete job by ID |

### Notes

- Ensure MongoDB is running locally, or update `MONGO_URI` to your hosted cluster.
- When deploying, set appropriate environment variables and configure your production web server to forward `/api` requests to the backend.
