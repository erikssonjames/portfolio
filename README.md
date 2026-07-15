# Portfolio (Next.js + Prisma + Postgres)

This repo runs your portfolio locally with:

- **Next.js** (dev server)
- **Postgres** (via Docker)
- **Prisma** (migrations + client)

For the information and template needed to add a project, see [Adding a project](docs/adding-a-project.md).

> In **Kubernetes**, `DATABASE_URL` comes from a Secret.  
> Locally, `DATABASE_URL` comes from `.env.local`.

---

## Prerequisites

- Node.js 20+
- Docker + Docker Compose
- npm (or your preferred package manager)

---

## Local setup (first time)

### 1 Install dependencies

```bash
npm install
```

### 2 Start Postgres locally

This project uses a local Postgres database via Docker.

Start it:

```bash
docker compose up -d
```

Check it's running:

```bash
docker compose ps
```

### 3 Create .env.local

Create a file named `.env.local` in the project root:

```bash
DATABASE_URL="postgresql://portfolio:portfolio@localhost:5432/portfolio?schema=public"
```

### 4 Run migrations

```bash
npx prisma migrate dev
npm run db:seed
```

### 5 Run the app

```bash
npm run dev
```

### Capture the featured project preview

The featured Gym Quest card uses a locally stored Playwright screenshot so it does not depend on a third-party image proxy:

```bash
npx playwright install chromium
npm run capture:preview
```

You can pass a different URL and output path when needed:

```bash
node scripts/capture-preview.mjs https://example.com public/previews/example.png
```
