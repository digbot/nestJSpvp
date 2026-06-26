# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**Development:**
```bash
npm run dev          # Run backend + webui concurrently
npm run start:dev    # NestJS watch mode (backend only)
npm run main         # Run backend + Google Sheet writer
```

**Build & Lint:**
```bash
npm run build        # Compile NestJS to dist/
npm run lint         # ESLint with auto-fix (src/ and test/)
npm run format       # Prettier formatting
```

**Testing:**
```bash
npm run test              # Run unit tests
npm run test:watch        # Watch mode
npm run test:cov          # Coverage report
npm run test:e2e          # End-to-end tests
```

**Database migrations (TypeORM):**
```bash
npm run migration:run       # Apply pending migrations
npm run migration:generate  # Auto-generate migration from entity changes
npm run migration:create    # Create empty migration file
npm run migration:revert    # Revert last migration
```

**Tasks:**
```bash
npm run task:umv     # Run update-middle-month-value batch task
```

**Docker:**
```bash
npm run docker:mysql   # Start MySQL container
npm run docker:build   # Build app image
npm run docker:start   # Start app container
```

## Architecture

This is a **personal finance tracker** with three components:

1. **NestJS backend** (`src/`) — REST API on port 3007
2. **React frontend** (`webui/`) — SPA on port 3000, Tailwind CSS, React Router v6
3. **Python data integration** (`google_sheet_writer/`) — Google Sheets sync, spawned as a child process by NestJS via `GET /run`

### Backend Structure

The backend has two domain modules and an auth layer:

- **`src/day/`** — Daily transaction CRUD. Each entry has a `hash` field for idempotency. Supports two date formats: `dd.mm.yyyy` (legacy) and `yyyy-mm-dd`. The `GET /day/byMonth` endpoint uses a SQL window function to compute running totals.
- **`src/month/`** — Monthly financial summaries (income, expenses, buffer, investments). The service computes `diff = in - out`, per-day averages, and year-over-year `middleMonthValueByYear` values. `GET /month/short` includes chart data.
- **`src/auth/`** — JWT + Passport. A single hardcoded user (`digger`) is defined in `src/users/users.service.ts`. An `APP_GUARD` protects all routes except `POST /auth/login`. JWT expiry is 60 seconds.
- **`src/tasks/`** — Standalone batch scripts (not HTTP). Run via dedicated npm scripts.

### Database

MySQL 5.7, managed via TypeORM. Two entities:

- **`DayState`** (`src/typeorm/entities/DayState.ts`) — `id, date, value (decimal 6.2), comment, note, type (cc|manuel), hash`
- **`MonthState`** (`src/typeorm/entities/MonthState.ts`) — `id, date, in/out/buffer/invest` (each with `_bgn` variant), `middleMonthValueByYear`

Migrations live in `src/migrations/`. TypeORM config is at `src/config/typeorm.ts`.

### Key Configuration

- **`.env`** — Database credentials and `USER_PASSWORD` for the hardcoded auth user
- **`src/auth/constants.ts`** — JWT secret
- **`nest-cli.json`** — `sourceRoot = src/`
- **`tsconfig.json`** — ES2021 target, commonjs, decorators enabled
- **`docker-compose.yml`** — Orchestrates MySQL, NestJS (port 3007), and React (port 3000)
