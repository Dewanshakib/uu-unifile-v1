# Unifile v3

Unifile is a university-focused file and classroom directory platform built with Next.js, Better Auth, Drizzle ORM, and PostgreSQL.

It helps students quickly browse academic resources (by year → semester → section → category), while admins manage files and classroom metadata from a protected dashboard.

---

## What this project does

- Browse files by structured academic hierarchy
- Browse Google Classroom entries by academic hierarchy
- Authenticate users with email/password (Better Auth)
- Restrict dashboard access based on role (`ADMIN` / `SUPER_ADMIN`)
- Manage categories, subjects, files, and Google Classrooms from admin UI
- Send password reset emails via Gmail SMTP
- Keep Supabase Postgres warm using a scheduled cron endpoint

---

## Tech stack

- **Framework:** Next.js 16 (App Router, typed routes)
- **Language:** TypeScript
- **Database:** PostgreSQL (Supabase compatible)
- **ORM:** Drizzle ORM + Drizzle Kit
- **Auth:** Better Auth (`emailAndPassword`)
- **Validation:** Zod + React Hook Form
- **UI:** Tailwind CSS v4 + shadcn/ui + Radix primitives
- **Notifications:** Sonner
- **Email:** Nodemailer (Gmail)

---

## Project structure

Top-level folders of interest:

- `app/` — App Router pages, auth pages, dashboard pages, API routes
- `actions/` — server actions for create/update operations
- `components/` — UI and feature sections (auth, dashboard, layout)
- `drizzle/` — DB client, schema, SQL migrations
- `lib/` — auth client/server config, validation schemas, mail utilities
- `public/` — static assets

---

## Data model (high level)

### Auth tables
- `user` (with additional fields: `role`, `batch`, `section`)
- `session`
- `account`
- `verification`

### Domain tables
- `file`: title, link, category, fileType, section, semester, year
- `google-classroom`: course, code, instructor, section, semester, year, subject, flags
- `category`: reusable file categories
- `subject`: reusable subject names

### Roles
- `USER`: can browse content
- `ADMIN`: can manage files + Google Classrooms
- `SUPER_ADMIN`: can additionally manage categories + subjects

---

## Route map

### Public/browse routes
- `/` — entry cards (Files currently enabled)
- `/files` → `/files/year/[year]/semister/[semister]/section/[section]/category/[category]/files`
- `/google-classrooms` → `/google-classrooms/year/[year]/semister/[semister]/section/[section]/subject/[subject]/files`

### Auth routes
- `/sign-in`
- `/sign-up`
- `/request-password-reset`
- `/reset-password`

### Admin routes
- `/dashboard` (requires session and admin role)
- `/dashboard/file`
- `/dashboard/google-classroom`
- `/dashboard/category` (SUPER_ADMIN)
- `/dashboard/subject` (SUPER_ADMIN)

### API routes
- `/api/auth/[...all]` — Better Auth handler
- `/api/cron/keep-alive` — protected DB ping endpoint

---

## Environment variables

Create `.env` (you can copy from `sample.env`) and set:

```env
# Database
DATABASE_URL=

# Scheduled keep-alive protection
CRON_SECRET=

# Better Auth
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# Mail (Gmail SMTP)
GMAIL_ID=
GMAIL_PASS=
EMAIL_FROM=
```

### Notes
- `BETTER_AUTH_URL` must match your running app URL.
- `NEXT_PUBLIC_BETTER_AUTH_URL` is used by the password reset flow redirect.
- `CRON_SECRET` must be sent as `Authorization: Bearer <CRON_SECRET>` for `/api/cron/keep-alive`.

### Preview URL
- Current preview URL: `https://uu-unifile-v1.vercel.app`
- For preview deployments, set:

```env
BETTER_AUTH_URL=https://uu-unifile-v1.vercel.app
NEXT_PUBLIC_BETTER_AUTH_URL=https://uu-unifile-v1.vercel.app
```

---

## Local development

### 1) Install dependencies

```bash
pnpm install
```

### 2) Configure environment

```bash
# macOS/Linux
cp sample.env .env

# Windows (PowerShell)
Copy-Item sample.env .env
```

Then update values in `.env`.

### 3) Run database migrations

```bash
pnpm db:migrate
```

### 4) Start development server

```bash
pnpm dev
```

Open: `http://localhost:3000`

---

## Available scripts

- `pnpm dev` — start dev server
- `pnpm build` — production build
- `pnpm start` — run production server
- `pnpm lint` — run ESLint
- `pnpm db:migrate` — apply Drizzle migrations
- `pnpm db:studio` — open Drizzle Studio on port `5000`

---

## Authentication behavior

- Sign-up requires:
	- Uttara University email (`@uttara.ac.bd`)
	- password (8–32 chars)
	- batch
	- section
- Password reset emails are sent via Nodemailer/Gmail.
- Session cookies are handled via Better Auth + `nextCookies` plugin.

---

## Authorization behavior

- Dashboard layout performs server-side checks:
	- if no session → redirect to `/sign-in`
	- if role is not `ADMIN` or `SUPER_ADMIN` → redirect to `/`
- Sidebar menu changes by role:
	- `ADMIN`: files + classrooms
	- `SUPER_ADMIN`: files + classrooms + categories + subjects

---

## Operational/deployment notes

- `vercel.json` schedules keep-alive cron:
	- path: `/api/cron/keep-alive`
	- schedule: `0 0 * * 1,4`
- Keep-alive endpoint runs `SELECT 1` against DB.
- Add `CRON_SECRET` in your deployment environment and pass it in cron requests.

---

## Current implementation notes

- Several routes/components intentionally use the `semister` segment spelling in URLs and folders.
- Google Classroom browse flow currently contains some hard-coded route segments in one intermediate page (`year/1/semister/1`), while final filtering still reads dynamic params on deeper routes.
- Home page currently highlights `Files`; `Google Classrooms` card is present but commented out.

---

## Troubleshooting

### App redirects to sign-in unexpectedly
- Check Better Auth URL/secret env vars.
- Verify cookies are enabled in browser.

### Reset emails are not sent
- Verify `GMAIL_ID`, `GMAIL_PASS`, and `EMAIL_FROM`.
- Ensure the Gmail account/app-password is configured correctly.

### Database queries fail
- Verify `DATABASE_URL`.
- Ensure migrations have been applied (`pnpm db:migrate`).

---

## Roadmap ideas

- Remove hard-coded Google Classroom route segments in intermediate pages
- Re-enable Google Classroom card on home page
- Add filtering/search in dashboard lists
- Add audit logs for admin actions

---

## License

No license file is currently defined in this repository.
