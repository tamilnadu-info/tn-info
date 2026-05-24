# Contributing

Thank you for wanting to improve TN-Info. Contributions of all kinds are welcome — data corrections, new features, bug fixes, translations, and documentation improvements.

---

## Before You Start

- Check [open issues](https://github.com/tamilnadu-info/tn-info/issues) — your bug or idea might already be tracked
- For large changes (new page, new data category), open an issue first to discuss approach before writing code
- Small fixes (typos, data corrections, CSS tweaks) can go straight to a PR

---

## Setup

```bash
git clone https://github.com/tamilnadu-info/tn-info.git
cd tn-info
pnpm install
pnpm dev       # starts all three apps
```

Ports: `web` → 3000 · `events` → 3001 · `news` → 3002

---

## Types of Contributions

### 1. Data corrections

If a college name is wrong, a constituency winner is outdated, or a scheme description is inaccurate:

1. Find the data file in [`docs/data-sources.md`](data-sources.md)
2. Edit the relevant `.ts` or `.json` file in `apps/web/src/data/`
3. Include a link to the official source in your PR description

### 2. New data

Adding a new college, event, news item, or scheme:

- **College:** Append to the correct JSON in `apps/web/src/data/tnea/` following the existing schema
- **Event:** Append to `apps/web/src/data/events.ts` and `apps/events/src/data/events.ts`
- **News:** Append to `TN_NEWS.hot` or `TN_NEWS.hidden` in `apps/web/src/data/news.ts`

Always include a `source` URL pointing to the official/primary source.

### 3. Bug fixes

- Reproduce the bug locally first
- Fix the smallest possible change — don't refactor surrounding code
- Add a note in the PR description describing how to reproduce before and verify after

### 4. New features

- Open an issue first to confirm it fits the project's direction
- Keep PRs focused — one feature per PR
- Follow the existing UI patterns (CSS class naming, modal structure, pagination)

---

## Code Conventions

**TypeScript**
- `npx tsc --noEmit` must pass before committing (run from `apps/web/`)
- No `any` types without a comment explaining why

**CSS**
- Never override a global class directly — scope new styles inside a parent selector
- Grid column classes follow `.col-row-{section}` naming convention
- Mobile overrides go inside the existing `@media (max-width: 640px)` block in `globals.css`

**Comments**
- Write no comments by default
- Add a comment only when the **why** is non-obvious — a workaround, a constraint, a subtle invariant

**Components**
- Server Components by default; add `"use client"` only when you need browser APIs or interactive state
- Receive pre-loaded data as props from the server component parent — don't `fetch()` inside client components

---

## Commit Messages

Imperative sentence-case, no period, 3–7 words:

```
Add Tiruppur medical college district
Fix mobile overflow on polytechnic table
Update TNPSC G2A vacancy count to 4002
Remove duplicate Vellore arts college entry
```

Not:
```
added new college.          ← past tense, has period
Fix: updated the data       ← colon prefix, unnecessary "the"
WIP                         ← not descriptive
```

---

## Pull Request Checklist

Before opening a PR:

- [ ] `pnpm build` passes
- [ ] `npx tsc --noEmit` passes (from `apps/web/`)
- [ ] Data changes include a source URL in the PR description
- [ ] No unrelated files changed
- [ ] PR title matches the commit message style above

---

## Issue Labels

| Label | Meaning |
|---|---|
| `data-error` | Incorrect or outdated data point |
| `bug` | Broken UI or functionality |
| `enhancement` | New feature or improvement |
| `good first issue` | Small, well-scoped task — good for first-time contributors |
| `needs-source` | Data claim needs an official source link |
| `help wanted` | Core team is actively looking for contributions here |

---

## Community

This is a community project about Tamil Nadu public data. We welcome contributors regardless of background — if you can read Tamil or know a data source we've missed, that's just as valuable as code.

For questions, use [GitHub Discussions](https://github.com/tamilnadu-info/tn-info/discussions) rather than issues.
