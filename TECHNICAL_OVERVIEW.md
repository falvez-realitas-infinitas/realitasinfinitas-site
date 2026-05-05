# Technical Overview: `realitasinfinitas-site`

## Scope

This document summarizes the current technical state of `/Users/facualvez/realitasinfinitas/realitasinfinitas-site` as a practical handoff reference for developers and operators.

## High-level architecture

- **Framework/runtime:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4.
- **Routing model:** Locale-prefixed routing with `next-intl` and App Router segment `app/[locale]`.
- **i18n approach:**
  - Locales: `en`, `es` (`i18n/routing.ts`).
  - `localePrefix: "always"` to enforce `/en/...` and `/es/...` URLs.
  - Messages loaded from `messages/en.json` and `messages/es.json`.
  - Proxy middleware in `proxy.ts` delegates to `next-intl/middleware`.
- **Auth approach:** No user auth layer is implemented in this project.
- **Key modules:**
  - `app/[locale]/*`: localized pages and layouts.
  - `components/Navbar.tsx`, `components/Footer.tsx`, `components/LocaleSwitcher.tsx`.
  - `lib/seo.ts`, `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`.
  - `app/api/reality-image/route.ts` and `lib/reality-builder/*`.

## Tech stack and major dependencies

- **Core:** `next@16.2.4`, `react@19.2.4`, `typescript`.
- **i18n:** `next-intl@4.x`.
- **UI/helpers:** `lucide-react`, `clsx`, `tailwind-merge`, Tailwind CSS 4.
- **Build/tooling:** ESLint 9, Next ESLint config, PostCSS.

## Directory structure (important parts)

- `app/`
  - `layout.tsx` (global metadata, OG/Twitter defaults, robots directives)
  - `[locale]/layout.tsx` (locale validation, `NextIntlClientProvider`, JSON-LD injection)
  - `[locale]/{page.tsx,about,products,products/clinic,contact,reality,reset-password}`
  - `sitemap.ts`, `robots.ts`, `manifest.ts`
  - `api/reality-image/route.ts`
- `i18n/`
  - `routing.ts`, `request.ts`, `navigation.ts`
- `messages/`
  - `en.json`, `es.json`
- `components/`
  - Global marketing components, navigation, footer, locale switcher
- `lib/`
  - `seo.ts`, `site.ts`, reality-builder utilities
- `proxy.ts`

## Environment and configuration notes

- **Known env vars used in code/config:**
  - `ALLOW_DEV_ORIGINS` (optional): comma-separated list for `next.config.ts` `allowedDevOrigins` in non-production.
- **Port/runtime assumptions:**
  - Local dev defaults to Next.js port `3000` (`npm run dev`).
- **Commands (`package.json`):**
  - `npm run dev`
  - `npm run build`
  - `npm run start`
  - `npm run lint`
- **Hosting assumptions:**
  - Not explicitly configured for a specific provider in code.
  - `siteConfig.url` points to `https://realitasinfinitas.com`.

## Key user flows

- **Locale switching**
  - Locale-aware links use `i18n/navigation`.
  - `LocaleSwitcher` strips existing locale prefixes before linking to avoid paths like `/es/en/...`.
  - Locale prefix strategy is enforced by middleware/proxy and `localePrefix: "always"`.
- **Main pages**
  - Home, About, Products, Clinic product page, Contact, Reality, and Reset Password routes exist under localized paths.
- **SEO setup**
  - Global metadata in `app/layout.tsx`.
  - Page-level metadata via `buildPageMetadata()` in localized page files.
  - Alternate language/canonical links in `lib/seo.ts`.
  - `app/sitemap.ts` emits localized entries and alternates.
  - `app/robots.ts` exposes sitemap and crawl rules.
  - JSON-LD (`Organization`, `WebSite`) emitted in locale layout.

## Security and compliance notes

- **PII/PHI processing:** Not documented in codebase for this marketing site.
- **Auth/session controls:** Not documented in codebase.
- **Security middleware behavior:** Proxy is used for locale routing, not access control.

## Deployment and operations notes

- Build/lint scripts are standard Next.js.
- No explicit infrastructure manifests (Kubernetes/Terraform/etc.) were found.
- Production deployment topology is **Not documented in codebase**.
- Observability and monitoring strategy is **Not documented in codebase**.

## Recent implemented changes worth noting

- Locale/header behavior hardening:
  - Locale switch path normalization to avoid duplicate locale segments.
  - Locale routing stabilized with `localePrefix: "always"` and proxy updates for Next.js 16 behavior.
- SEO additions/expansion:
  - Shared page metadata builder (`lib/seo.ts`).
  - Localized alternates/canonical handling.
  - Sitemap/robots/manifest support and JSON-LD insertion.

## Open items / recommended next steps

1. Add project-specific runbook docs covering required env vars, startup sequence, and troubleshooting.
2. Define and document production deployment architecture (hosting platform, env separation, secrets, backups).
3. Add smoke tests for locale routing and SEO outputs (alternates, sitemap, robots).
4. Define and document observability and alerting (logs, uptime checks, error tracking), currently **Not documented in codebase**.
