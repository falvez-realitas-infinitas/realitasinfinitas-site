# Realitas Infinitas — Marketing site

Public marketing and product site for Realitas Infinitas: localized pages, SEO, and integrations (e.g. clinic product links, optional “reality” image API).

## Tech stack

- **Next.js** 16 (App Router), **React** 19, **TypeScript**
- **Tailwind CSS** 4, **next-intl** (locales `en` / `es`)
- **ESLint** 9 (`eslint-config-next`)

There is no user authentication in this app.

## Prerequisites

- **Node.js** 20+ recommended (aligns with `@types/node` in this repo)
- **npm** (or compatible client)

## Environment variables

Copy the block below into a `.env.local` (or your host’s env UI) and adjust values. Never commit real secrets.

```bash
# Optional — base URL of the medical-clinic app (e.g. reset-password deep links)
# NEXT_PUBLIC_CLINIC_APP_URL=http://localhost:3000

# Optional — Pollinations API key for `/api/reality-image` (server-side)
# POLLINATIONS_API_KEY=

# Optional — comma-separated hosts for Next.js `allowedDevOrigins` in development
# (e.g. testing from a phone on your LAN). Example:
# ALLOW_DEV_ORIGINS=192.168.1.61
```

`NODE_ENV` is set by Next.js; you normally do not define it locally.

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

Runs [Next.js dev](https://nextjs.org/docs/app/api-reference/cli/next#next-dev-options) on **port 3000** by default (`http://localhost:3000`).

**Port note:** The `medical-clinic` app also defaults to port 3000. If you run both locally, start one of them on another port, e.g. `npx next dev --webpack -p 3001` (this project’s `dev` script uses `next dev --webpack`).

## Build and quality

| Command        | Description                          |
| -------------- | ------------------------------------ |
| `npm run build` | Production build                     |
| `npm run start` | Start production server (after build) |
| `npm run lint`  | ESLint                               |

There is no `test` script in `package.json`.

## Project structure (high level)

- `app/` — App Router: root `layout.tsx`, `sitemap.ts`, `robots.ts`, `manifest.ts`, `api/reality-image/`, and localized routes under `app/[locale]/`
- `components/` — Shared UI (navigation, footer, locale switcher, marketing sections, reality builder)
- `i18n/` — `next-intl` routing and request config (`routing.ts`, `request.ts`, `navigation.ts`)
- `messages/` — `en.json`, `es.json` copy
- `lib/` — SEO helpers, site config, reality-builder utilities
- `proxy.ts` — Dev/proxy wiring for locale middleware (`next-intl`)

URLs use a **locale prefix always** (e.g. `/en/...`, `/es/...`). See **[TECHNICAL_OVERVIEW.md](./TECHNICAL_OVERVIEW.md)** for routing, i18n, and SEO details.

## Deployment

Production hosting is not fixed in code. Use any Node-compatible host that supports Next.js 16 (e.g. Vercel or your own runtime). Configure the environment variables above in that environment.

## Further reading

- [Next.js documentation](https://nextjs.org/docs)
- **[TECHNICAL_OVERVIEW.md](./TECHNICAL_OVERVIEW.md)** — architecture, locales, env vars used in code, and ops notes
