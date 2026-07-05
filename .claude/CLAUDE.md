# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**Development:**
```bash
npm run dev          # Run backend + webui concurrently
npm run start:dev    # NestJS watch mode (backend only)
npm run main         # Run backend + Google Sheet writer
```

**Frontend (run separately inside `webui/`):**
```bash
cd webui && npm start   # React dev server on port 3000
```

**Build & Lint:**
```bash
npm run build        # Compile NestJS to dist/
npm run lint         # ESLint with auto-fix (src/ and test/)
npm run format       # Prettier formatting
```

**Testing:**
```bash
npm run test                          # Run all unit tests
npm run test -- --testPathPattern=day # Run tests matching a file path
npm run test -- -t "test name"        # Run tests matching a name pattern
npm run test:cov                      # Coverage report
npm run test:e2e                      # End-to-end tests
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
npm run task:umv     # Recalculate and persist middleMonthValueByYear for all months
```

**Docker:**
```bash
npm run docker:mysql   # Start MySQL container
npm run docker:build   # Build app image
npm run docker:start   # Start app container
```

## Architecture

Personal finance tracker with three components:

1. **NestJS backend** (`src/`) — REST API on port 3007
2. **React frontend** (`webui/`) — SPA on port 3000, Tailwind CSS, React Router v6
3. **Python data integration** (`google_sheet_writer/`) — reads Gmail and Google Pay, syncs to Google Sheets and the NestJS API

### Backend Structure

Two domain modules and an auth layer:

- **`src/day/`** — Daily transaction CRUD. `hash` is the idempotency key: `createAsync` does an upsert keyed on `hash`. Accepts two date formats: `dd.mm.yyyy` (legacy) and `yyyy-mm-dd`. `GET /day/byMonth` always returns the **current** month using a SQL window function for the running total.
- **`src/month/`** — Monthly financial summaries. `createAsync` upserts keyed on `date`. `GET /month/short` returns computed fields: `byDay` (average daily spend), `diff` (in − out), `diffWithoutInvest` (out − invest), and `middleMonthValue` (current-year average across completed months, computed live). `GET /month/current` returns the current month row using the persisted `middleMonthValueByYear` for historical years.
- **`src/auth/`** — JWT + Passport wired up, but **`JwtAuthGuard.canActivate` unconditionally returns `true`** (`src/auth/jwt-auth.guard.ts:16`), so all routes are currently unprotected. The single hardcoded user is `digger` (`src/users/users.service.ts`).
- **`src/tasks/`** — Standalone batch scripts bootstrapped via `NestFactory.createApplicationContext`. Not HTTP endpoints; run via npm scripts.
- **`src/app.controller.ts`** — `GET /run` spawns the Python script as a child process from `./google_sheet_writer/`.

### Database

MySQL 5.7, managed via TypeORM. **`synchronize: true`** is set in `src/config/typeorm.ts`, so the schema auto-syncs from entity changes — migrations in `src/migrations/` are supplementary.

Two entities:

- **`DayState`** (`src/typeorm/entities/DayState.ts`) — `id, date, value (decimal 6.2), comment, note, type (cc|manuel), hash` (indexed)
- **`MonthState`** (`src/typeorm/entities/MonthState.ts`) — `id, date, in, out, buffer, invest` (each with optional `_bgn` variant), `middleMonthValueByYear` (persisted by the `task:umv` batch job). Has a computed `diff` getter (not stored).

### middleMonthValue vs middleMonthValueByYear

There are two related but distinct concepts:
- **`middleMonthValue`** (in `GET /month/short` response) — computed live per-request: average of `out − invest` across completed months **in the current year only**, excluding the current month.
- **`middleMonthValueByYear`** (persisted column on `MonthState`) — per-year average stored on every row for that year, updated by running `npm run task:umv`. Used by `GET /month/current` for historical years.

### Python Integration (`google_sheet_writer/`)

Reads bank notifications from Gmail, processes them, and pushes data to both Google Sheets and the NestJS API (`send_day_data`, `send_month_data` via `service/httpClient.py`). Runs in `dev` or `prod` mode controlled by config (`helpers/storeHelper.py`). Requires `google_sheet_writer/credentials.json` (Google OAuth credentials, not checked in).

### Frontend (`webui/`)

Three routes:
- `/` → `ItemList` — current month's daily transactions; has RUN button to trigger `GET /run` (spawns Python script)
- `/months` → `MonthList` — line chart of monthly financial data (Recharts)
- `/add` → `AddItemForm` — form to add a daily transaction

All API calls use `process.env.REACT_APP_API_URL` as the base URL.

### Key Configuration

- **`.env`** — `DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, USER_PASSWORD`
- **`webui/.env`** — `REACT_APP_API_URL` pointing to the NestJS backend
- **`src/auth/constants.ts`** — JWT secret
- **`src/config/typeorm.ts`** — TypeORM config; `synchronize: true` auto-syncs schema
- **`docker-compose.yml`** — Orchestrates MySQL, NestJS (port 3007), and React (port 3000)
