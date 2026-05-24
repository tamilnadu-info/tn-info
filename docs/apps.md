# Apps

Three independent Next.js 16 applications, each a separate Vercel project that shares the same monorepo and TypeScript config package.

---

## apps/web — Main Site

**Domain:** [tn-info.in](https://tn-info.in)  
**Dev port:** 3000 (test: 4000)  
**Package:** `@tn-info/web`

### Pages

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | Home — hero, district atlas, stat rotator, news + events previews |
| `/education` | `app/education/page.tsx` | Education hub — 4-tab college browser (Engineering, Arts, Polytechnic, Medical) + counselling updates |
| `/events` | `app/events/page.tsx` | Upcoming events listing |
| `/events/[slug]` | `app/events/[slug]/page.tsx` | Event detail with Add-to-Calendar |
| `/news` | `app/news/page.tsx` | News listing with client-side filter |
| `/news/[slug]` | `app/news/[slug]/page.tsx` | News article detail |

### API Routes

| Route | Cache | Purpose |
|---|---|---|
| `/api/github` | 1 h | GitHub repo stars and open issues count |
| `/api/pipeline` | none | Health status of upstream data pipelines |
| `/api/tnea/meta` | 24 h | TNEA college + branch metadata |
| `/api/tnea/cutoff` | none | Cutoff scores for a given college/branch |
| `/api/tnea/rank` | none | Rank-to-college lookup |
| `/api/tnea/allotments` | none | Seat allotment records |

### Key Components

```
src/components/
├── Atlas.tsx            # Interactive district-level college map
├── TNMap.tsx            # SVG Tamil Nadu map with hover states
├── DistrictModal.tsx    # District detail panel (MLAs, stats)
├── Header.tsx           # Site header with nav + language toggle
├── Footer.tsx           # Footer with links
├── Hero.tsx             # Hero section
├── HeroTicker.tsx       # Scrolling news ticker in hero
├── FocusCards.tsx       # Highlighted info cards
├── StatRotator.tsx      # Auto-rotating statistics (seats, colleges, etc.)
├── NewsPreview.tsx      # Latest news card strip
├── EventsPreview.tsx    # Upcoming events strip
├── LiveWire.tsx         # "Live" indicator dot
├── GHStars.tsx          # GitHub star count badge
├── DisclaimerModal.tsx  # Data accuracy disclaimer
├── MobileDrawer.tsx     # Full-screen mobile nav drawer
├── HamburgerBtn.tsx     # Mobile menu button
├── LanguageToggle.tsx   # EN / தமிழ் switch
├── JsonLd.tsx           # JSON-LD structured data injector
└── CodeWindow.tsx       # Terminal-style code display on home page
```

### Education Page in Detail

The `/education` page is the most complex — it loads five datasets server-side and passes them as props to `EduInteractive`, a client component that manages all filter/search/pagination/modal state.

```
page.tsx  (Server Component)
  └── EduInteractive.tsx  (Client Component — tabs, filters, search)
        ├── CollegeModal.tsx    — Engineering college detail + TNEA cutoffs
        ├── ArtsModal.tsx       — Arts & Science college detail
        ├── PolyModal.tsx       — Polytechnic college detail + branches
        └── MedicalModal.tsx    — Medical college detail + NMC info
```

**Tab → Dataset mapping:**

| Tab | JSON file | Count |
|---|---|---|
| Engineering | `tnea/colleges.json` | ~423 |
| Arts & Science | `tnea/arts_colleges_*.json` | ~902 |
| Polytechnic | `tnea/polytechnic_colleges.json` | 441 |
| Medical | `tnea/medical_colleges.json` | 52 |

### Data Files (apps/web/src/data/)

```
data/
├── tn-data.ts                  # 38 districts, MLAs, population, schemes, cabinet
├── tn-geo.ts                   # District boundary coordinates for map rendering
├── constituency-winner-2026.ts # 2026 election winners per constituency
├── constituency-party-2026.ts  # Party affiliation per constituency
├── district-detail.ts          # District profiles (area, literacy, major industries)
├── news.ts                     # Curated news items (hot + hidden categories)
├── news-bodies.ts              # News source registry (name, URL, bias tag)
├── events.ts                   # Upcoming events array
├── event-bodies.ts             # Event organiser registry
└── tnea/
    ├── colleges.json            # 423 TNEA engineering colleges
    ├── cutoff_2025.json         # TNEA 2025 closing ranks (2 MB)
    ├── rank_2025.json           # Rank-to-college lookup (2 MB)
    ├── allotments_2025.json     # Seat allotment records (2.1 MB)
    ├── meta.json                # College + branch master list
    ├── arts_colleges_2026.json  # 471 govt + aided arts colleges
    ├── arts_colleges_private.json # ~431 private arts colleges
    ├── polytechnic_colleges.json  # 441 polytechnics (AICTE + tnpoly.in merge)
    └── medical_colleges.json      # 52 NMC-approved MBBS colleges
```

---

## apps/events — Events Subdomain

**Domain:** [events.tn-info.in](https://events.tn-info.in)  
**Dev port:** 3001 (test: 4001)  
**Package:** `@tn-info/events`

Lightweight listing app for upcoming Tamil Nadu events �� tech meetups, government exams, cultural festivals, public hearings.

### Pages

| Route | Component | Description |
|---|---|---|
| `/` | `EventsList.tsx` | Grid of all upcoming events with type/tag filters |
| `/[id]` | `EventDetail.tsx` | Full event page — venue, time, Add-to-Calendar button |

### Data

Events are defined in `src/data/events.ts` as a typed array. Each entry has:

```ts
{
  id: string
  title: string
  titleTa: string        // Tamil translation
  date: string           // ISO date
  time?: string
  venue?: string
  district?: string
  type: "exam" | "meetup" | "festival" | "hearing" | ...
  organiser: string      // key into event-bodies.ts
  href: string           // official registration/info URL
  description: string
}
```

**To add an event:** append an entry to `src/data/events.ts` in both apps/events and apps/web (the main site shows a preview strip).

---

## apps/news — News Subdomain

**Domain:** [news.tn-info.in](https://news.tn-info.in)  
**Dev port:** 3002 (test: 4002)  
**Package:** `@tn-info/news`

Curated news platform separating mainstream headlines ("hot") from stories that rarely surface in major media ("hidden").

### Pages

| Route | Component | Description |
|---|---|---|
| `/` | `NewsList.tsx` | All articles with tag + category filter |
| `/[id]` | `NewsDetail.tsx` | Article detail with source attribution |

### News categories

Each news item in `src/data/news.ts` belongs to one of two buckets:

```ts
TN_NEWS.hot     // Active breaking / high-traffic stories
TN_NEWS.hidden  // RTI findings, audit reports, minority community stories
```

Tags: `EDUCATION`, `HEALTH`, `ENVIRO`, `POLITICS`, `ECONOMY`, `INFRA`, `CULTURE`

**Why "hidden"?** Many significant Tamil Nadu stories — RTI audit findings, minority welfare updates, environmental violations — never get mainstream coverage. The hidden bucket explicitly surfaces them with a `whyHidden` field explaining the media gap.

---

## Shared Package: packages/tsconfig

Contains two TypeScript configuration files shared across all apps:

| File | Purpose |
|---|---|
| `base.json` | Strict mode, no composite, ESNext module, `bundler` resolution |
| `nextjs.json` | Extends base + Next.js JSX preserve, plugins for Next.js |

Each app's `tsconfig.json` extends `@tn-info/tsconfig/nextjs.json`.

---

## E2E Tests

Each app has a `src/e2e/` directory with Playwright tests. The root `playwright.config.ts` runs all three suites together:

```bash
pnpm test:all           # headless (CI)
pnpm test:all:headed    # with browser window
pnpm test:all:ui        # Playwright UI mode
```

Browsers: **Chrome, Firefox**  
Devices: **Desktop 1280×720, Pixel 5, iPhone 14**  
Workers: **1** (sequential, avoids port conflicts)
