# TN-Info

**Open data platform for Tamil Nadu — elections, education, news, and events in one place.**

[![Build](https://img.shields.io/github/actions/workflow/status/tamilnadu-info/tn-info/pipeline-check.yml?branch=main&label=pipeline)](https://github.com/tamilnadu-info/tn-info/actions)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)](https://github.com/tamilnadu-info/tn-info/issues)
[![pnpm](https://img.shields.io/badge/pnpm-10.33.3-orange)](https://pnpm.io)

> தமிழ்நாட்டின் தேர்தல், கல்வி, செய்திகள், நிகழ்வுகள் ��� ஒரே இடத்தில்.

**Live:** [tn-info.in](https://tn-info.in) · [events.tn-info.in](https://events.tn-info.in) · [news.tn-info.in](https://news.tn-info.in)

---

## What is this?

TN-Info aggregates publicly available data about Tamil Nadu — constituency election results, 1,500+ colleges (engineering, arts, polytechnic, medical), active government schemes, news, and cultural events — into a fast, searchable, bilingual (English + Tamil) web platform.

All data is sourced from official portals (TNEA, AICTE, NMC, ECI, tn.gov.in) and stored as static files. There is no database; the site is entirely statically rendered and deployed on Vercel.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5, React 19 |
| Monorepo | Turborepo + pnpm workspaces |
| Styling | Vanilla CSS (global + scoped) |
| Testing | Playwright (E2E, 3 browsers) |
| Deploy | Vercel (auto on push to `main`) |
| Fonts | Crimson Pro · Manrope · JetBrains Mono · Noto Sans Tamil |

---

## Quick Start

**Prerequisites:** Node.js 20+, pnpm 10+

```bash
git clone https://github.com/tamilnadu-info/tn-info.git
cd tn-info
pnpm install

# Run all three apps in parallel
pnpm dev
```

| App | URL |
|---|---|
| Main site | http://localhost:3000 |
| Events | http://localhost:3001 |
| News | http://localhost:3002 |

```bash
# Build for production
pnpm build

# Run E2E tests (headless)
pnpm test:all
```

---

## Project Structure

```
tn-info/
├── apps/
│   ├── web/          # Main site — tn-info.in
│   ├── events/       # Events subdomain — events.tn-info.in
│   └── news/         # News subdomain — news.tn-info.in
├── packages/
│   └── tsconfig/     # Shared TypeScript configuration
├── turbo.json        # Turborepo task config
├── pnpm-workspace.yaml
└── playwright.config.ts  # Root E2E test config
```

Full architecture, per-app structure, and data source details are in [`docs/`](docs/).

---

## Raising an Issue

Found a data error, a broken page, or want to suggest a new feature?

1. Check [existing issues](https://github.com/tamilnadu-info/tn-info/issues) first
2. Click **New Issue** and pick the right template:
   - **Data error** — wrong college info, outdated election result, stale scheme data
   - **Bug** — broken UI, console error, bad mobile layout
   - **Feature request** — new page, new data source, new filter
3. Include the URL where you saw the issue and (for data errors) a link to the official source showing the correct value

We aim to respond within **48 hours**.

---

## Contributing

See [`docs/contributing.md`](docs/contributing.md) for the full guide. Short version:

```bash
# Fork → clone → create a branch
git checkout -b fix/college-name-typo

# Make changes, then
pnpm build          # must pass
npx tsc --noEmit    # must pass (apps/web)

# Commit using imperative sentence-case (no period)
git commit -m "Fix spelling in Coimbatore Medical College name"

# Push and open a PR against main
```

---

## Contributors

Thanks to everyone who has contributed data, code, and fixes.

<a href="https://github.com/tamilnadu-info/tn-info/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=tamilnadu-info/tn-info" alt="Contributors" />
</a>

---

## License

[MIT](LICENSE) — data sourced from public government portals; see [`docs/data-sources.md`](docs/data-sources.md) for individual source attributions.
