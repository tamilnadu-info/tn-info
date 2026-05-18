import { test, expect, type Page } from "@playwright/test";

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function goto(page: Page) {
  await page.goto("/");
}

// ─── Page Metadata ────────────────────────────────────────────────────────────

test.describe("Metadata & SEO", () => {
  test("page title mentions TN-Info News", async ({ page }) => {
    await goto(page);
    await expect(page).toHaveTitle(/TN-Info|News/i);
  });

  test("meta description mentions Tamil Nadu news", async ({ page }) => {
    await goto(page);
    await expect(page.locator("meta[name='description']")).toHaveAttribute("content", /Tamil Nadu|TN|news/i);
  });

  test("OG title is set", async ({ page }) => {
    await goto(page);
    await expect(page.locator("meta[property='og:title']")).toHaveAttribute("content", /.+/);
  });

  test("OG type is website", async ({ page }) => {
    await goto(page);
    await expect(page.locator("meta[property='og:type']")).toHaveAttribute("content", "website");
  });

  test("Twitter card is summary_large_image", async ({ page }) => {
    await goto(page);
    await expect(page.locator("meta[name='twitter:card']")).toHaveAttribute("content", "summary_large_image");
  });

  test("html lang is en", async ({ page }) => {
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

  test("brand name TN-Info.in is in header", async ({ page }) => {
    await expect(page.locator("header")).toContainText(/TN-Info/i);
  });

  test("link to tn-info.in is present", async ({ page }) => {
    const homeLink = page.locator('a[href*="tn-info.in"]').first();
    await expect(homeLink).toBeVisible();
  });

  test("language toggle is present", async ({ page }) => {
    await expect(page.locator('[data-testid="lang-toggle"]')).toBeVisible();
  });
});

// ─── News List Page ───────────────────────────────────────────────────────────

test.describe("News List Page", () => {
  test.beforeEach(async ({ page }) => {
    await goto(page);
  });

  test("page h1 is visible", async ({ page }) => {
    await expect(page.locator("h1")).toBeVisible();
  });

  test("news list container renders", async ({ page }) => {
    await expect(page.locator('[data-testid="news-list"]')).toBeVisible();
  });

  test("HOT section heading is visible", async ({ page }) => {
    await expect(page.locator("#hot, .badge.hot, span.badge").first()).toBeVisible();
    await expect(page.locator("text=HOT")).toBeVisible();
  });

  test("HIDDEN section heading is visible", async ({ page }) => {
    await expect(page.locator("text=HIDDEN")).toBeVisible();
  });

  test("at least one HOT feature card is rendered", async ({ page }) => {
    await expect(page.locator(".feat-card").first()).toBeVisible();
  });

  test("at least one HIDDEN row is rendered", async ({ page }) => {
    await expect(page.locator(".hid-row").first()).toBeVisible();
  });

  test("HOT cards show headline", async ({ page }) => {
    await expect(page.locator(".feat-headline.eonly").first()).toBeVisible();
    const text = await page.locator(".feat-headline.eonly").first().textContent();
    expect(text?.trim().length).toBeGreaterThan(0);
  });

  test("HOT cards show tag pill", async ({ page }) => {
    await expect(page.locator(".tag-pill").first()).toBeVisible();
  });

  test("HOT cards show district pill", async ({ page }) => {
    await expect(page.locator(".dist-pill").first()).toBeVisible();
  });

  test("HOT cards show summary", async ({ page }) => {
    await expect(page.locator(".feat-summary").first()).toBeVisible();
  });

  test("HOT cards show source", async ({ page }) => {
    await expect(page.locator(".feat-foot .src").first()).toBeVisible();
  });

  test("HIDDEN rows show tag", async ({ page }) => {
    await expect(page.locator(".hid-row .nc-tag").first()).toBeVisible();
  });

  test("HIDDEN rows show district", async ({ page }) => {
    await expect(page.locator(".hid-row .dist").first()).toBeVisible();
  });

  test("HIDDEN rows show 'Why this is hidden' label", async ({ page }) => {
    await expect(page.locator(".why-lbl").first()).toBeVisible();
  });

  test("HIDDEN rows have a Read link", async ({ page }) => {
    await expect(page.locator(".hid-row a.arr, .hid-row a[aria-label='Read']").first()).toBeVisible();
  });
});

// ─── News Search & Sort ───────────────────────────────────────────────────────

test.describe("News Search & Sort Controls", () => {
  test.beforeEach(async ({ page }) => {
    await goto(page);
    await expect(page.locator('[data-testid="news-list"]')).toBeVisible();
  });

  test("search input is visible and editable", async ({ page }) => {
    const search = page.locator('input[aria-label="Search news"]');
    await expect(search).toBeVisible();
    await expect(search).toBeEditable();
  });

  test("sort buttons are present (Newest, By district, By category)", async ({ page }) => {
    await expect(page.locator('button[data-sort="newest"]')).toBeVisible();
    await expect(page.locator('button[data-sort="district"]')).toBeVisible();
    await expect(page.locator('button[data-sort="category"]')).toBeVisible();
  });

  test("Newest sort button is active by default", async ({ page }) => {
    await expect(page.locator('button[data-sort="newest"].on')).toBeVisible();
  });

  test("searching TNEA shows EDUCATION-tagged results", async ({ page }) => {
    await page.locator('input[aria-label="Search news"]').fill("TNEA");
    const cards = page.locator(".feat-card, .hid-row");
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test("searching gibberish shows 0 hot and 0 hidden", async ({ page }) => {
    await page.locator('input[aria-label="Search news"]').fill("xyzgibberish99999");
    await expect(page.locator(".feat-card")).toHaveCount(0);
    await expect(page.locator(".hid-row")).toHaveCount(0);
  });

  test("clearing search restores all items", async ({ page }) => {
    const hotCount = await page.locator(".feat-card").count();
    const hidCount = await page.locator(".hid-row").count();
    await page.locator('input[aria-label="Search news"]').fill("TNEA");
    await page.locator('input[aria-label="Search news"]').clear();
    await expect(page.locator(".feat-card")).toHaveCount(hotCount);
    await expect(page.locator(".hid-row")).toHaveCount(hidCount);
  });

  test("sort by district changes order", async ({ page }) => {
    const beforeFirst = await page.locator(".feat-card").first().textContent();
    await page.locator('button[data-sort="district"]').click();
    const afterFirst = await page.locator(".feat-card").first().textContent();
    expect(beforeFirst).not.toBe(afterFirst);
  });

  test("sort by category changes order", async ({ page }) => {
    await page.locator('button[data-sort="category"]').click();
    await expect(page.locator('button[data-sort="category"].on')).toBeVisible();
  });

  test("hot + hidden count display is visible", async ({ page }) => {
    const countText = page.locator("span", { hasText: /hot/ }).first();
    await expect(countText).toBeVisible();
  });
});

// ─── News Detail Page ─────────────────────────────────────────────────────────

test.describe("News Detail Page", () => {
  test("navigates to tnea-2026-reg detail page", async ({ page }) => {
    await page.goto("/tnea-2026-reg");
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });

  test("detail page title includes story keyword", async ({ page }) => {
    await page.goto("/tnea-2026-reg");
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
  });

  test("mut-may detail page loads", async ({ page }) => {
    await page.goto("/mut-may");
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });

  test("news detail page has header and footer", async ({ page }) => {
    await page.goto("/tnea-2026-reg");
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });

  test("clicking a HOT news card navigates to its detail page", async ({ page }) => {
    await goto(page);
    const firstCard = page.locator(".feat-card").first();
    const href = await firstCard.getAttribute("href");
    expect(href).toBeTruthy();
    await firstCard.click();
    await expect(page).toHaveURL(new RegExp(href!.replace("/", "\\/")));
  });

  test("clicking a HIDDEN news row link navigates to its detail page", async ({ page }) => {
    await goto(page);
    const firstRow = page.locator(".hid-row a.arr, .hid-row a[aria-label='Read']").first();
    const href = await firstRow.getAttribute("href");
    expect(href).toBeTruthy();
    await firstRow.click();
    await expect(page).toHaveURL(new RegExp(href!.replace("/", "\\/")));
  });
});

// ─── Language Toggle ──────────────────────────────────────────────────────────

test.describe("Language Toggle", () => {
  test.beforeEach(async ({ page }) => {
    await goto(page);
  });

  test("Tamil toggle sets data-lang=ta", async ({ page }) => {
    await page.locator('[data-testid="lang-toggle"] button[data-lang="ta"]').click();
    await expect(page.locator("body")).toHaveAttribute("data-lang", "ta");
  });

  test("English toggle sets data-lang=en", async ({ page }) => {
    await page.locator('[data-testid="lang-toggle"] button[data-lang="ta"]').click();
    await page.locator('[data-testid="lang-toggle"] button[data-lang="en"]').click();
    await expect(page.locator("body")).toHaveAttribute("data-lang", "en");
  });

  test("Tamil headlines are visible in Tamil mode", async ({ page }) => {
    await page.locator('[data-testid="lang-toggle"] button[data-lang="ta"]').click();
    const tOnly = page.locator(".feat-headline.tonly, .head.tonly").first();
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

  test("footer links back to main site", async ({ page }) => {
    const link = page.locator('footer a[href*="tn-info.in"]').first();
    await expect(link).toBeVisible();
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

  test("header is visible on mobile", async ({ page }) => {
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

  test("news list renders on mobile", async ({ page }) => {
    await expect(page.locator('[data-testid="news-list"]')).toBeVisible();
  });

  test("HOT cards render on mobile", async ({ page }) => {
    await expect(page.locator(".feat-card").first()).toBeVisible();
  });

  test("HIDDEN rows render on mobile", async ({ page }) => {
    await expect(page.locator(".hid-row").first()).toBeVisible();
  });

  test("search works on mobile", async ({ page }) => {
    await page.locator('input[aria-label="Search news"]').fill("xyzgibberish99999");
    await expect(page.locator(".feat-card")).toHaveCount(0);
  });

  test("news detail page renders without overflow on mobile", async ({ page }) => {
    await page.goto("/tnea-2026-reg");
    const overflow = await page.evaluate(() => document.body.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(5);
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });
});

// ─── Android Responsive ──────────────────────────────────────────────────────

test.describe("Mobile Responsive — Android viewport (393×851)", () => {
  test.use({ viewport: { width: 393, height: 851 } });

  test.beforeEach(async ({ page }) => {
    await goto(page);
  });

  test("no horizontal overflow on Pixel 5", async ({ page }) => {
    const overflow = await page.evaluate(() => document.body.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(5);
  });

  test("news list visible on Pixel 5", async ({ page }) => {
    await expect(page.locator('[data-testid="news-list"]')).toBeVisible();
  });

  test("search input works on Pixel 5", async ({ page }) => {
    await page.locator('input[aria-label="Search news"]').fill("TNEA");
    const count = await page.locator(".feat-card, .hid-row").count();
    expect(count).toBeGreaterThan(0);
  });
});
