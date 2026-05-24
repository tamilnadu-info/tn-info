# Architecture

## Overview

TN-Info is a **static-data monorepo** — three independent Next.js applications sharing no runtime state, no database, and no CMS. All data lives as TypeScript constants or JSON files committed to the repo. Pages are server-rendered at request time on Vercel's edge network.

```
                    ┌─────────────────────────────────┐
                    │         Vercel (Hosting)         │
                    │                                  │
          ┌─────────┴─────┐   ┌────────��─┐  ┌────────┴──────┐
          │  apps/web      │   │  apps/   │  │  apps/news    │
          │  tn-info.in    │   │  events  │  │  news.tn-     │
          │  (main site)   │   │  .tn-    │  │  info.in      │
          └───────┬────────┘   │  info.in │  └───────────────┘
                  │            └──────────┘
          ┌───────┴────────────────────────────────────┐
          │          Static Data Layer (src/data/)      │
          │   TS constants  +  JSON files (≈ 8.4 MB)   │
          └─────────────────────────────────────────────┘
```

---

## Monorepo Layout

```
tn-info/
├── apps/
│   ├── web/          # Main site (port 3000 dev / 4000 test)
│   ├── events/       # Events subdomain (port 3001 / 4001)
│   └── news/         # News subdomain (port 3002 / 4002)
├── packages/
│   └── tsconfig/     # Shared TypeScript base + Next.js config
├── turbo.json        # Task graph: build → lint → test
├── pnpm-workspace.yaml
└── playwright.config.ts
```

**Tooling:**
- **pnpm 10** — fast installs, strict workspace isolation
- **Turborepo** — parallel task execution with output caching; `build` depends on `^build` (packages first)
- **TypeScript 5** — strict mode across all apps

---

## Data Flow

```
Official Portal  →  Scraper / manual export  →  JSON / TS file  →  Next.js page
```

There is **no live API fetch at render time** for college/election/scheme data. All data is imported directly in Server Components from `src/data/`. This means:

- Zero runtime latency for data lookups
- No API keys needed for core features
- Updates require a code commit + Vercel redeploy
- Total JSON payload committed to repo: ~8.4 MB

The only live external calls are:
| Call | Where | Cache |
|---|---|---|
| GitHub stars/issues | `app/api/github/route.ts` | 1 hour |
| TNEA metadata (live) | `app/api/tnea/meta/route.ts` | 24 hours |
| TNEA cutoff/rank/allotments | `app/api/tnea/*.ts` | per-request |

---

## Rendering Strategy

All pages use **Next.js App Router** with Server Components by default.

| Page | Strategy | Reason |
|---|---|---|
| `/` (home) | SSR | Live GitHub stars widget |
| `/education` | SSR | Loads college JSON server-side |
| `/events`, `/events/[slug]` | SSR | Static data, SEO-friendly |
| `/news`, `/news/[slug]` | SSR + Client | Filter/search is client-side state |
| `/api/*` | Route Handler | On-demand, cached at edge |

Interactive components (search inputs, modals, pagination) are wrapped in `"use client"` components that receive pre-loaded data as props.

---

## Deployment

All three apps deploy to **Vercel** on every push to `main`.

```
git push origin main
        │
        ▼
   Vercel Build
        │
   turbo build  ──►  next build (each app in parallel)
        │
   Deploy to Edge
```

Domain routing is handled by Vercel project settings:
- `tn-info.in` → apps/web
- `events.tn-info.in` → apps/events
- `news.tn-info.in` → apps/news

Environment variables: only `NEXT_PUBLIC_SITE_URL` is needed (set per-project in Vercel).

---

## CI/CD Pipeline

`.github/workflows/pipeline-check.yml` — manually triggered health check.

Pings six upstream data sources (TNEA, ECI, TANCA, tn.gov.in schemes, government gazette, FOSS United) and writes a JSON status file to the `pipeline-data` branch. Used to detect when an upstream source has gone offline before doing a data refresh.

---

## Key Design Decisions

**Why no database?**
The data changes infrequently (elections every 5 years, college lists annually) and the volume fits in a git repo. A database would add cost, a connection string secret, and an extra failure point.

**Why three separate Next.js apps instead of one?**
Events and News are separate subdomains with different metadata, sitemaps, and eventually different deployment cadences. Monorepo keeps code sharing easy while allowing independent deploys.

**Why vanilla CSS instead of Tailwind/CSS-in-JS?**
Full control over the design system without the overhead of a utility-class build step. The CSS is scoped by component-level class names following a `.section-element` convention.

**Why TypeScript constants for small data instead of JSON?**
`tn-data.ts`, `news.ts`, `events.ts` etc. benefit from type inference, tree-shaking, and IDE autocomplete. Large, frequently queried datasets (colleges, cutoffs) use JSON for easier tooling.
