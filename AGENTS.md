# AGENTS.md

Bengali-language news portal. Next.js 16 (App Router, React 19, Turbopack), Tailwind v4, HeroUI v3, better-auth + MongoDB.

## Commands
- `npm run dev` — dev server on :3000
- `npm run build` / `npm run start`
- `npm run lint` — ESLint flat config (`eslint.config.mjs`)
- `npx tsc --noEmit` — typecheck (there is no `typecheck` script)
- No test runner or test files exist.

## Things that will trip you up
- **Auth middleware lives in `src/proxy.ts`, not `middleware.ts`.** Next.js 16 renamed the convention; the file exports `proxy` (not `middleware`) and a `config.matcher`. Grep for `proxy.ts` before assuming middleware is missing. The matcher currently guards `/profile` and `/article/:path`.
- **All news data comes from an external API**: `https://news-api-v2.vercel.app/api/*`, fetched inline in server components with `next: { revalidate: 3600 }`. There is no local data layer, route handler, or DB for news. Endpoints in use: `/api/news`, `/api/news/sections`, `/api/news/most-read`, `/api/categories`, `/api/category/:id`, `/api/article/:id`. Responses are wrapped as `{ data: ... }`.
- **`next/image` remote hosts are allowlisted** in `next.config.ts` — only `ichef.bbci.co.uk` is currently permitted. API-provided image URLs from other hosts will throw at runtime; add a `remotePatterns` entry when introducing new sources.
- **Auth config is `src/lib/auth.ts`** (server) and `src/lib/auth-client.ts` (client). It hardcodes the Mongo DB name `better-auth` and throws at import if `BETTER_AUTH_MD_URI` is unset (note the `MD` spelling, not `MONGODB`).
- **Required env** (no `.env.example`; `.env` is gitignored — do not commit it): `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `BETTER_AUTH_MD_URI`, `GOOGLE_CLIENT_ID/SECRET`, `GITHUB_CLIENT_ID/SECRET`.
- **Next 16 generated route types**: pages use `LayoutProps<"/">` and `params: Promise<{...}>` (params must be awaited). These globals come from `.next/types`; don't import them.
- UI text and date formatting are Bengali (`bn-BD`). Body font is SolaimanLipi (`public/fonts/SolaimanLipi.ttf`, declared in `src/app/globals.css`); HeroUI styles are imported via `@import "@heroui/styles"`. `--font-oswald` is referenced in an article heading but never defined.

## Layout
- `src/app/` — pages; `(auth)/` route group holds sign-in/sign-up, `profiledata/` is the authenticated profile page, `api/auth/[...all]/route.ts` mounts better-auth.
- `src/components/homepage/` and `src/components/shared/` — server components; `src/types/news.ts` holds all news/API types (`INews`, `IArticle`, etc.).
- `@/*` maps to `./src/*`.
