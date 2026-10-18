# Bangla News 24

A Bengali-language news portal built with Next.js 16 (App Router), React 19, Tailwind CSS v4, HeroUI v3, and better-auth backed by MongoDB.

All news content is sourced from an external read-only API (`https://news-api-v2.vercel.app/api/*`); the app has no local news database. Accounts, sessions, and profile data are stored in MongoDB through better-auth.

## Features

- **Home page** — a featured hero story, a "latest" rail, a most-read section, and curated category sections.
- **Category listings** — `/category/[slug]` pages with a featured lead story on page 1, a card grid, and pagination.
- **Article pages** — full rich-text body (text, images, subheadings), byline, reading time, source link, tags, share buttons, and related articles.
- **Search** — a searchable corpus built from the latest feed plus the first pages of every scrapable category, with a live suggestion dropdown (`/api/suggest`) and a paginated results page.
- **Breaking news ticker** — a scrolling marquee of the latest headlines.
- **Authentication** — email/password plus Google and GitHub OAuth via better-auth, with a guarded profile page.
- **Bengali-first UI** — SolaimanLipi body font, Bengali (`bn-BD`) date formatting, and Bengali numerals throughout.
- **Bengali ⇄ English translation** — a header toggle backed by Google's website translator, persisted in a cookie.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, HeroUI v3, Tailwind CSS v4 |
| Auth | better-auth (MongoDB adapter) |
| Database | MongoDB |
| Language | TypeScript |
| Lint | ESLint (flat config) |
| News data | `news-api-v2.vercel.app` (external, read-only) |

## Getting started

### Prerequisites

- Node.js 20+
- A MongoDB connection string (local or Atlas)
- Google and GitHub OAuth apps (optional, only needed for social sign-in)

### Install

```bash
npm install
```

### Configure environment

Create a `.env` file in the project root. It is gitignored — do not commit it.

```dotenv
BETTER_AUTH_SECRET=your_auth_secret
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_MD_URI=mongodb://localhost:27017   # note the "MD" spelling
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

`src/lib/auth.ts` throws at import time if `BETTER_AUTH_MD_URI` is missing, and hardcodes the database name `better-auth`.

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server on port 3000 |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | Typecheck (no dedicated script) |

There is no test runner or test suite.

## Project structure

```
src/
├── app/                      # App Router pages
│   ├── (auth)/               # sign-in, sign-up, profile (route group)
│   ├── api/
│   │   ├── auth/[...all]/    # better-auth handler
│   │   └── suggest/          # live search suggestions
│   ├── article/[id]/         # article page + body, share, related
│   ├── category/[categoryId] # category listing (slug)
│   ├── search/               # search results
│   ├── profiledata/          # authenticated profile page
│   ├── layout.tsx            # header, navbar, ticker, footer
│   ├── not-found.tsx         # 404
│   └── <section>/            # placeholder section routes
├── components/
│   ├── homepage/             # home sections (hero, latest, most-read, ...)
│   ├── shared/               # header, navbar, footer, cards, ticker, ...
│   ├── profile/              # profile view + update form
│   ├── search/               # search input
│   └── auth/                 # auth shell/layout
├── lib/                      # news API, search pool, auth, Bengali helpers
├── types/news.ts             # all news/API types
└── proxy.ts                  # auth middleware (Next 16 convention)
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home page |
| `/category/[slug]` | Category listing (e.g. `/category/politics`) |
| `/article/[id]` | Article page |
| `/search?q=...` | Search results |
| `/sign-in`, `/sign-up` | Authentication |
| `/profile` | Profile (auth-guarded) |
| `/profiledata` | Profile (auth-guarded) |
| `/api/suggest?q=...` | JSON search suggestions |
| `/api/auth/[...all]` | better-auth endpoint |

> The top-level routes `/politics`, `/sports`, `/world`, `/country`, `/technology`, `/health`, and `/economics` are placeholders; live listings live under `/category/[slug]`.

## How it works

### News data

News is fetched inline in server components with `next: { revalidate: 3600 }`. Endpoints in use: `/api/news`, `/api/news/sections`, `/api/news/most-read`, `/api/categories`, `/api/category/:slug`, and `/api/article/:id`. Responses are wrapped as `{ data: ... }`. All fetch helpers live in `src/lib/news.ts`.

Because the API sends no CORS headers, the browser can't query it directly — search runs server-side.

### Search

`/api/news` only exposes ~45 articles, so search would miss anything older. `src/lib/news-pool.ts` instead builds a corpus from the latest feed plus the first two pages of every scrapable category, dedupes it by id, sorts newest-first, and memoizes it per process for 5 minutes. Matching (`src/lib/search.ts`) is a case-insensitive substring test against title and description.

### Auth

- Server config: `src/lib/auth.ts` (email/password + Google + GitHub, MongoDB adapter).
- Client config: `src/lib/auth-client.ts`.
- Middleware: `src/proxy.ts` — Next.js 16 renamed `middleware.ts` to `proxy.ts`, and it exports `proxy` (not `middleware`). Its matcher currently guards `/profile`.

## Deployment

Deploy on Vercel or any Node host. Set all environment variables from the section above in the deployment environment, and make sure the OAuth callback URLs point at the deployed `BETTER_AUTH_URL`.

`next/image` remote hosts are allowlisted in `next.config.ts` — only `ichef.bbci.co.uk` is permitted today. Add a `remotePatterns` entry when introducing image URLs from other hosts.
