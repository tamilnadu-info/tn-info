import { test, expect, type Page } from "@playwright/test";

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function goto(page: Page) {
  await page.goto("/");
}

// ─── Page Metadata ────────────────────────────────────────────────────────────

test.describe("Metadata & SEO", () => {
  test("page title mentions TN-Info Events", async ({ page }) => {
    await goto(page);
    await expect(page).toHaveTitle(/TN-Info/i);
  });

  test("meta description mentions Tamil Nadu events", async ({ page }) => {
    await goto(page);
    await expect(page.locator("meta[name='description']")).toHaveAttribute("content", /Tamil Nadu|TN/i);
  });

  test("OG title is set", async ({ page }) => {
    await goto(page);
    await expect(page.locator("meta[property='og:title']")).toHaveAttribute("content", /.+/);
  });

  test("OG type is website", async ({ page }) => {
    await goto(page);
    await expect(page.locator("meta[property='og:type']")).toHaveAttribute("content", "website");
  });

  test("Twitter card is present", async ({ page }) => {
    await goto(page);
    await expect(page.locator("meta[name='twitter:card']")).toHaveAttribute("content", "summary_large_image");
  });

  test("html lang attribute is en", async ({ page }) => {
    await goto(page);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("JSON-LD structured data is present", async ({ page }) => {
    await goto(page);
    const jsonLd = page.locator("script[type='application/ld+json']");
    await expect(jsonLd.first()).toBeAttached();
  });
});

// ─── Header ───────────────────────────────────────────────────────────────────

test.describe("Header", () => {
  test.beforeEach(async ({ page }) => {
    await goto(page);
  });

  test("header is visible", async ({ page }) => {
    await expect(page.locator("header")).toBeVisible();
  });

  test("brand name TN-Info.in is visible", async ({ page }) => {
    await expect(page.locator("header")).toContainText(/TN-Info/i);
  });

  test("navigation links are present", async ({ page }) => {
    const nav = page.locator("nav, header nav");
    await expect(nav).toBeVisible();
  });

  test("link back to main site (tn-info.in) is present", async ({ page }) => {
    const homeLink = page.locator('a[href*="tn-info.in"]').first();
    await expect(homeLink).toBeVisible();
  });

  test("language toggle is present", async ({ page }) => {
    await expect(page.locator('[data-testid="lang-toggle"]')).toBeVisible();
  });
});

// ─── Events List ─────────────────────────────────────────────────────────────

test.describe("Events List Page", () => {
  test.beforeEach(async ({ page }) => {
    await goto(page);
  });

  test("page h1 is visible", async ({ page }) => {
    await expect(page.locator("h1")).toBeVisible();
  });

  test("events list container is rendered", async ({ page }) => {
    await expect(page.locator('[data-testid="events-list"]')).toBeVisible();
  });

  test("at least one event card is rendered", async ({ page }) => {
    const cards = page.locator(".ev-card");
    await expect(cards.first()).toBeVisible();
  });

  test("event cards have a title", async ({ page }) => {
    const title = page.locator(".ev-title.eonly").first();
    await expect(title).toBeVisible();
    const text = await title.textContent();
    expect(text?.trim().length).toBeGreaterThan(0);
  });

  test("event cards show date (day and month)", async ({ page }) => {
    await expect(page.locator(".ev-day").first()).toBeVisible();
    await expect(page.locator(".ev-mon").first()).toBeVisible();
  });

  test("event cards show city and venue", async ({ page }) => {
    await expect(page.locator(".ev-where").first()).toBeVisible();
  });

  test("event cards show fee badge", async ({ page }) => {
    await expect(page.locator(".ev-fee").first()).toBeVisible();
  });

  test("event cards show RSVP info", async ({ page }) => {
    await expect(page.locator(".ev-rsvp").first()).toBeVisible();
  });

  test("event cards show time-until label", async ({ page }) => {
    await expect(page.locator(".ev-until").first()).toBeVisible();
  });
});

// ─── Events Filter & Sort ─────────────────────────────────────────────────────

test.describe("Events Filter & Sort Controls", () => {
  test.beforeEach(async ({ page }) => {
    await goto(page);
    await expect(page.locator('[data-testid="events-list"]')).toBeVisible();
  });

  test("search input is visible and editable", async ({ page }) => {
    const search = page.locator('input[aria-label="Search events"]');
    await expect(search).toBeVisible();
    await expect(search).toBeEditable();
  });

  test("Kind filter buttons are present (All, Tech, Political)", async ({ page }) => {
    await expect(page.locator('button[data-f="all"]')).toBeVisible();
    await expect(page.locator('button[data-f="tech"]')).toBeVisible();
    await expect(page.locator('button[data-f="political"]')).toBeVisible();
  });

  test("Sort buttons are present (By date, By city, By category)", async ({ page }) => {
    await expect(page.locator('button[data-sort="date"]')).toBeVisible();
    await expect(page.locator('button[data-sort="city"]')).toBeVisible();
    await expect(page.locator('button[data-sort="cat"]')).toBeVisible();
  });

  test("filtering by Tech shows only tech events", async ({ page }) => {
    await page.locator('button[data-f="tech"]').click();
    const cards = page.locator(".ev-card.kind-tech");
    await expect(cards.first()).toBeVisible();
    const politicalCards = page.locator(".ev-card.kind-political");
    await expect(politicalCards).toHaveCount(0);
  });

  test("filtering by Political shows only political events", async ({ page }) => {
    await page.locator('button[data-f="political"]').click();
    const cards = page.locator(".ev-card.kind-political");
    await expect(cards.first()).toBeVisible();
    const techCards = page.locator(".ev-card.kind-tech");
    await expect(techCards).toHaveCount(0);
  });

  test("All filter restores all events", async ({ page }) => {
    const allCount = await page.locator(".ev-card").count();
    await page.locator('button[data-f="tech"]').click();
    await page.locator('button[data-f="all"]').click();
    await expect(page.locator(".ev-card")).toHaveCount(allCount);
  });

  test("searching for Chennai returns only Chennai events", async ({ page }) => {
    await page.locator('input[aria-label="Search events"]').fill("Chennai");
    const cards = page.locator(".ev-card");
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const text = await cards.nth(i).textContent();
      expect(text?.toLowerCase()).toContain("chennai");
    }
  });

  test("searching gibberish shows 0 events", async ({ page }) => {
    await page.locator('input[aria-label="Search events"]').fill("xyzgibberish999");
    await expect(page.locator(".ev-card")).toHaveCount(0);
  });

  test("clearing search restores all events", async ({ page }) => {
    const allCount = await page.locator(".ev-card").count();
    await page.locator('input[aria-label="Search events"]').fill("Chennai");
    await page.locator('input[aria-label="Search events"]').clear();
    await expect(page.locator(".ev-card")).toHaveCount(allCount);
  });

  test("sorting by city changes card order", async ({ page }) => {
    const beforeFirst = await page.locator(".ev-card").first().textContent();
    await page.locator('button[data-sort="city"]').click();
    const afterFirst = await page.locator(".ev-card").first().textContent();
    expect(beforeFirst).not.toBe(afterFirst);
  });

  test("Download .ics button is present", async ({ page }) => {
    await expect(page.locator("button", { hasText: /Download .ics/i })).toBeVisible();
  });

  test("event count display is present (N / Total)", async ({ page }) => {
    const countSpan = page.locator("span", { hasText: /\d+ \/ \d+/ });
    await expect(countSpan).toBeVisible();
  });
});

// ─── Month Grouping ───────────────────────────────────────────────────────────

test.describe("Month Grouping (date sort)", () => {
  test.beforeEach(async ({ page }) => {
    await goto(page);
  });

  test("month group headings are visible when sorted by date", async ({ page }) => {
    await page.locator('button[data-sort="date"]').click();
    const monthGroups = page.locator(".month-group");
    const count = await monthGroups.count();
    expect(count).toBeGreaterThan(0);
  });

  test("month TOC/sidebar is rendered when sorted by date", async ({ page }) => {
    await page.locator('button[data-sort="date"]').click();
    const monthNav = page.locator(".month-toc, .month-nav, [class*='month']").first();
    await expect(monthNav).toBeVisible();
  });
});

// ─── Event Detail Page ────────────────────────────────────────────────────────

test.describe("Event Detail Page", () => {
  test("navigates to cod-2026 detail page", async ({ page }) => {
    await page.goto("/cod-2026");
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });

  test("event detail page has correct title in metadata", async ({ page }) => {
    await page.goto("/cod-2026");
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
  });

  test("event detail page shows event title", async ({ page }) => {
    await page.goto("/cod-2026");
    await expect(page.locator("h1, h2").first()).toContainText(/Open Data/i);
  });

  test("event detail page has header and footer", async ({ page }) => {
    await page.goto("/cod-2026");
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });

  test("tamil-wiki event detail page loads", async ({ page }) => {
    await page.goto("/tamil-wiki");
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });

  test("clicking an event card navigates to its detail page", async ({ page }) => {
    await goto(page);
    const firstCard = page.locator(".ev-card").first();
    const href = await firstCard.getAttribute("href");
    expect(href).toBeTruthy();
    await firstCard.click();
    await expect(page).toHaveURL(new RegExp(href!.replace("/", "\\/")));
  });
});

// ─── Language Toggle ──────────────────────────────────────────────────────────

test.describe("Language Toggle", () => {
  test.beforeEach(async ({ page }) => {
    await goto(page);
  });

  test("Tamil toggle sets data-lang=ta on body", async ({ page }) => {
    await page.locator('[data-testid="lang-toggle"] button[data-lang="ta"]').click();
    await expect(page.locator("body")).toHaveAttribute("data-lang", "ta");
  });

  test("English toggle sets data-lang=en on body", async ({ page }) => {
    await page.locator('[data-testid="lang-toggle"] button[data-lang="ta"]').click();
    await page.locator('[data-testid="lang-toggle"] button[data-lang="en"]').click();
    await expect(page.locator("body")).toHaveAttribute("data-lang", "en");
  });

  test("Tamil event titles are visible in Tamil mode", async ({ page }) => {
    await page.locator('[data-testid="lang-toggle"] button[data-lang="ta"]').click();
    const tOnly = page.locator(".ev-title.tonly").first();
    await expect(tOnly).toBeVisible();
  });
});

// ─── Footer ───────────────────────────────────────────────────────────────────

test.describe("Footer", () => {
  test.beforeEach(async ({ page }) => {
    await goto(page);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  });

  test("footer is visible", async ({ page }) => {
    await expect(page.locator("footer")).toBeVisible();
  });

  test("footer links back to tn-info.in", async ({ page }) => {
    const link = page.locator('footer a[href*="tn-info.in"]');
    await expect(link.first()).toBeVisible();
  });
});

// ─── Mobile Responsive ───────────────────────────────────────────────────────

test.describe("Mobile Responsive — iPhone viewport (390×844)", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test.beforeEach(async ({ page }) => {
    await goto(page);
  });

  test("no horizontal overflow on mobile", async ({ page }) => {
    const overflow = await page.evaluate(() => document.body.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(5);
  });

  test("header visible on mobile", async ({ page }) => {
    await expect(page.locator("header")).toBeVisible();
  });

  test("hamburger button is visible on mobile", async ({ page }) => {
    await expect(page.locator("#hamburger")).toBeVisible();
  });

  test("mobile drawer opens on hamburger click", async ({ page }) => {
    await page.locator("#hamburger").click();
    await expect(page.locator("#drawer")).toHaveClass(/show/);
  });

  test("mobile drawer closes with Escape", async ({ page }) => {
    await page.locator("#hamburger").click();
    await page.keyboard.press("Escape");
    await expect(page.locator("#drawer")).not.toHaveClass(/show/);
  });

  test("events list is visible on mobile", async ({ page }) => {
    await expect(page.locator('[data-testid="events-list"]')).toBeVisible();
  });

  test("event cards render on mobile", async ({ page }) => {
    await expect(page.locator(".ev-card").first()).toBeVisible();
  });

  test("filter buttons visible on mobile", async ({ page }) => {
    await expect(page.locator('button[data-f="all"]')).toBeVisible();
  });

  test("search input visible on mobile", async ({ page }) => {
    await expect(page.locator('input[aria-label="Search events"]')).toBeVisible();
  });

  test("event detail page renders on mobile", async ({ page }) => {
    await page.goto("/cod-2026");
    const overflow = await page.evaluate(() => document.body.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(5);
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });
});
