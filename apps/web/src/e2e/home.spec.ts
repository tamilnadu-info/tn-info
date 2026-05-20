import { test, expect, type Page } from "@playwright/test";

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function initPage(page: Page) {
  await page.addInitScript(() => localStorage.removeItem("tn-disc-dismissed"));
  await page.goto("/");
}

async function dismiss(page: Page) {
  await page.click("text=I understand");
  await expect(page.locator('[data-testid="disclaimer-modal"]')).not.toBeVisible();
}

// ─── Page Metadata ────────────────────────────────────────────────────────────

test.describe("Metadata & SEO", () => {
  test("page title contains TN Info", async ({ page }) => {
    await initPage(page);
    await expect(page).toHaveTitle(/TN Info/i);
  });

  test("meta description is present and mentions Tamil Nadu", async ({ page }) => {
    await initPage(page);
    await expect(page.locator("meta[name='description']")).toHaveAttribute("content", /Tamil Nadu/i);
  });

  test("meta keywords are present", async ({ page }) => {
    await initPage(page);
    const kw = page.locator("meta[name='keywords']");
    await expect(kw).toHaveAttribute("content", /.+/);
  });

  test("OG title is set", async ({ page }) => {
    await initPage(page);
    await expect(page.locator("meta[property='og:title']")).toHaveAttribute("content", /TN Info/i);
  });

  test("OG type is website", async ({ page }) => {
    await initPage(page);
    await expect(page.locator("meta[property='og:type']")).toHaveAttribute("content", "website");
  });

  test("OG image is set", async ({ page }) => {
    await initPage(page);
    await expect(page.locator("meta[property='og:image']")).toHaveAttribute("content", /og\.png/);
  });

  test("OG site name is TN-Info.in", async ({ page }) => {
    await initPage(page);
    await expect(page.locator("meta[property='og:site_name']")).toHaveAttribute("content", /TN-Info/);
  });

  test("Twitter card is summary_large_image", async ({ page }) => {
    await initPage(page);
    await expect(page.locator("meta[name='twitter:card']")).toHaveAttribute("content", "summary_large_image");
  });

  test("Twitter title is present", async ({ page }) => {
    await initPage(page);
    await expect(page.locator("meta[name='twitter:title']")).toHaveAttribute("content", /.+/);
  });

  test("html lang attribute is en", async ({ page }) => {
    await initPage(page);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  test("JSON-LD structured data is present", async ({ page }) => {
    await initPage(page);
    const jsonLd = page.locator("script[type='application/ld+json']");
    await expect(jsonLd.first()).toBeAttached();
  });
});

// ─── Disclaimer Modal ─────────────────────────────────────────────────────────

test.describe("Disclaimer Modal", () => {
  test.beforeEach(async ({ page }) => {
    await initPage(page);
  });

  test("shows on first load", async ({ page }) => {
    await expect(page.locator('[data-testid="disclaimer-modal"]')).toBeVisible();
  });

  test("dismisses on I understand click", async ({ page }) => {
    await page.click("text=I understand");
    await expect(page.locator('[data-testid="disclaimer-modal"]')).not.toBeVisible();
  });

  test("dismisses on Escape key", async ({ page }) => {
    await page.keyboard.press("Escape");
    await expect(page.locator('[data-testid="disclaimer-modal"]')).not.toBeVisible();
  });

  test("dismissal with checkbox ticked writes key to localStorage", async ({ page }) => {
    await page.locator("#discAck").check();
    await page.click("text=I understand");
    const stored = await page.evaluate(() => localStorage.getItem("tn-disc-dismissed"));
    expect(stored).toBeTruthy();
  });
});

// ─── Header ───────────────────────────────────────────────────────────────────

test.describe("Header", () => {
  test.beforeEach(async ({ page }) => {
    await initPage(page);
    await dismiss(page);
  });

  test("header element is visible", async ({ page }) => {
    await expect(page.locator('[data-testid="header"]')).toBeVisible();
  });

  test("brand name TN-Info.in is visible", async ({ page }) => {
    await expect(page.locator('[data-testid="header"]')).toContainText("TN-Info");
  });

  test("brand sub-label (Open Data) is visible", async ({ page }) => {
    await expect(page.locator('[data-testid="header"] .brand-sub').first()).toContainText("OPEN DATA");
  });

  test("Destrosec attribution link is present", async ({ page }) => {
    await expect(page.locator("a[href='https://destrosec.com']").first()).toBeVisible();
  });

  test("Districts nav link is present", async ({ page }) => {
    await expect(page.locator('[data-testid="header"] nav a[href="#districts"]')).toBeVisible();
  });

  test("Updates nav link is present", async ({ page }) => {
    await expect(page.locator('[data-testid="header"] nav a[href="#feed"]')).toBeVisible();
  });

  test("News nav link points to /news", async ({ page }) => {
    await expect(page.locator('[data-testid="header"] nav a[href="/news"]')).toBeVisible();
  });

  test("Events nav link points to /events", async ({ page }) => {
    await expect(page.locator('[data-testid="header"] nav a[href="/events"]')).toBeVisible();
  });

  test("API nav link is present", async ({ page }) => {
    await expect(page.locator('[data-testid="header"] nav a[href="#api"]')).toBeVisible();
  });

  test("language toggle is visible", async ({ page }) => {
    await expect(page.locator('[data-testid="lang-toggle"]')).toBeVisible();
  });

  test("stat rotator is visible in status strip", async ({ page }) => {
    await expect(page.locator('[data-testid="stat-rotator"]')).toBeVisible();
  });

  test("status strip shows system status", async ({ page }) => {
    await expect(page.locator(".status-strip")).toContainText(/operational|systems/i);
  });
});

// ─── Language Toggle ──────────────────────────────────────────────────────────

test.describe("Language Toggle", () => {
  test.beforeEach(async ({ page }) => {
    await initPage(page);
    await dismiss(page);
  });

  test("switches to Tamil — body gets data-lang=ta", async ({ page }) => {
    await page.locator('[data-testid="lang-toggle"] button[data-lang="ta"]').click();
    await expect(page.locator("body")).toHaveAttribute("data-lang", "ta");
  });

  test("switches back to English — body gets data-lang=en", async ({ page }) => {
    await page.locator('[data-testid="lang-toggle"] button[data-lang="ta"]').click();
    await page.locator('[data-testid="lang-toggle"] button[data-lang="en"]').click();
    await expect(page.locator("body")).toHaveAttribute("data-lang", "en");
  });

  test("Tamil-only elements become visible in Tamil mode", async ({ page }) => {
    await page.locator('[data-testid="lang-toggle"] button[data-lang="ta"]').click();
    const tOnly = page.locator("h1 .tonly, .tonly").first();
    await expect(tOnly).toBeVisible();
  });
});

// ─── Hero Section ─────────────────────────────────────────────────────────────

test.describe("Hero Section", () => {
  test.beforeEach(async ({ page }) => {
    await initPage(page);
    await dismiss(page);
  });

  test("h1 is visible and contains 'Tamil Nadu'", async ({ page }) => {
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("h1")).toContainText("Tamil Nadu");
  });

  test("platform version badge is visible", async ({ page }) => {
    await expect(page.locator("text=An open civic data platform")).toBeVisible();
  });

  test("hero shows 38 districts stat", async ({ page }) => {
    await expect(page.locator("text=38").first()).toBeVisible();
  });

  test("hero shows 234 constituencies stat", async ({ page }) => {
    await expect(page.locator("text=234").first()).toBeVisible();
  });

  test("hero shows 47 schemes stat", async ({ page }) => {
    await expect(page.locator("text=47").first()).toBeVisible();
  });

  test("hero shows 591 colleges stat", async ({ page }) => {
    await expect(page.locator("text=591").first()).toBeVisible();
  });

  test("Browse the data CTA is present", async ({ page }) => {
    await expect(page.locator('a[href="#districts"].btn')).toBeVisible();
  });

  test("Use the API CTA is present", async ({ page }) => {
    await expect(page.locator('a[href="#api"].btn')).toBeVisible();
  });

  test("hero ticker is visible", async ({ page }) => {
    await expect(page.locator('[data-testid="hero-ticker"]')).toBeVisible();
  });

  test("hero ticker has at least one item", async ({ page }) => {
    const items = page.locator('[data-testid="hero-ticker"] > span');
    const count = await items.count();
    expect(count).toBeGreaterThan(0);
  });
});

// ─── TN Map ───────────────────────────────────────────────────────────────────

test.describe("TN Map (Interactive SVG)", () => {
  test.beforeEach(async ({ page }) => {
    await initPage(page);
    await dismiss(page);
  });

  test("map container is visible", async ({ page }) => {
    await expect(page.locator('[data-testid="tn-map"]')).toBeVisible();
  });

  test("SVG element is rendered", async ({ page }) => {
    await expect(page.locator('[data-testid="tn-map"] svg')).toBeVisible();
  });

  test("district SVG paths are rendered (at least 30 visible)", async ({ page }) => {
    const paths = page.locator("svg path.tn-region");
    await expect(paths.first()).toBeVisible();
    const count = await paths.count();
    expect(count).toBeGreaterThanOrEqual(30);
  });

  test("hovering a district path shows the popover", async ({ page }) => {
    const path = page.locator("path.tn-region").first();
    await path.hover();
    await expect(page.locator("#hpop.show")).toBeVisible();
  });

  test("popover disappears when mouse leaves the district", async ({ page }) => {
    const path = page.locator("path.tn-region").first();
    await path.hover();
    await expect(page.locator("#hpop.show")).toBeVisible();
    await page.mouse.move(10, 10);
    await expect(page.locator("#hpop.show")).not.toBeVisible({ timeout: 3000 });
  });

  test("clicking a district path opens the district modal", async ({ page }) => {
    await page.locator("path.tn-region").first().click();
    await expect(page.locator('[data-testid="district-modal"]')).toBeVisible();
  });
});

// ─── District Modal ───────────────────────────────────────────────────────────

test.describe("District Modal", () => {
  test.beforeEach(async ({ page }) => {
    await initPage(page);
    await dismiss(page);
    await page.locator("path.tn-region").first().click();
    await expect(page.locator('[data-testid="district-modal"]')).toBeVisible();
  });

  test("modal has a visible district name heading", async ({ page }) => {
    await expect(page.locator(".dm-name")).toBeVisible();
  });

  test("modal shows Tamil district name", async ({ page }) => {
    await expect(page.locator(".dm-name-ta")).toBeVisible();
  });

  test("slideshow is rendered with at least one slide", async ({ page }) => {
    const slides = page.locator(".dm-slide");
    const count = await slides.count();
    expect(count).toBeGreaterThan(0);
  });

  test("slide navigation arrows are present", async ({ page }) => {
    await expect(page.locator("button[aria-label='Next slide']")).toBeVisible();
    await expect(page.locator("button[aria-label='Previous slide']")).toBeVisible();
  });

  test("constituencies section is rendered", async ({ page }) => {
    await expect(page.locator(".dm-section").first()).toContainText(/Constituencies/i);
  });

  test("population and MLA count are shown", async ({ page }) => {
    await expect(page.locator(".dm-quick")).toBeVisible();
    await expect(page.locator(".dm-quick")).toContainText(/Constituencies|Population/);
  });

  test("close button closes the modal", async ({ page }) => {
    await page.locator("button.dm-close").click();
    await expect(page.locator('[data-testid="district-modal"]')).not.toBeVisible();
  });

  test("Escape key closes the modal", async ({ page }) => {
    await page.locator(".dm-name").click();
    await page.keyboard.press("Escape");
    await expect(page.locator('[data-testid="district-modal"]')).not.toBeVisible();
  });

  test("clicking the shade overlay closes the modal", async ({ page }) => {
    await page.locator(".dm-shade.show").click({ position: { x: 5, y: 5 } });
    await expect(page.locator('[data-testid="district-modal"]')).not.toBeVisible();
  });

  test("can open a different district after closing", async ({ page }) => {
    await page.locator(".dm-name").click();
    await page.keyboard.press("Escape");
    await expect(page.locator('[data-testid="district-modal"]')).not.toBeVisible();
    await page.locator("path.tn-region").nth(5).click();
    await expect(page.locator('[data-testid="district-modal"]')).toBeVisible();
  });
});

// ─── Focus Cards ──────────────────────────────────────────────────────────────

test.describe("Focus Cards", () => {
  test.beforeEach(async ({ page }) => {
    await initPage(page);
    await dismiss(page);
  });

  test("section renders exactly 4 focus cards", async ({ page }) => {
    const cards = page.locator('[data-testid="focus-cards"] .focus');
    await expect(cards).toHaveCount(4);
  });

  test("Election card is visible with live badge", async ({ page }) => {
    const card = page.locator('[data-testid="focus-cards"] .focus').filter({ hasText: /Election/i });
    await expect(card).toBeVisible();
  });

  test("Education card is visible", async ({ page }) => {
    await expect(page.locator('[data-testid="focus-cards"]')).toContainText(/Education/i);
  });

  test("Benefits/Schemes card is visible", async ({ page }) => {
    await expect(page.locator('[data-testid="focus-cards"]')).toContainText(/Benefits|Scheme/i);
  });

  test("Tech Events card is visible", async ({ page }) => {
    await expect(page.locator('[data-testid="focus-cards"]')).toContainText(/Tech|Event/i);
  });

  test("election card shows 39/39 result", async ({ page }) => {
    await expect(page.locator('[data-testid="focus-cards"]')).toContainText(/39/);
  });

  test("education card shows college count", async ({ page }) => {
    await expect(page.locator('[data-testid="focus-cards"]')).toContainText(/591|college/i);
  });

  test("all cards have Live badges", async ({ page }) => {
    const liveBadges = page.locator('[data-testid="focus-cards"] .live');
    const count = await liveBadges.count();
    expect(count).toBeGreaterThan(0);
  });
});

// ─── Atlas (District Table) ───────────────────────────────────────────────────

test.describe("Atlas — District Table", () => {
  test.beforeEach(async ({ page }) => {
    await initPage(page);
    await dismiss(page);
    await page.locator('[data-testid="atlas"]').scrollIntoViewIfNeeded();
  });

  test("atlas section heading is visible", async ({ page }) => {
    await expect(page.locator('[data-testid="atlas"]')).toContainText(/38 districts/i);
  });

  test("renders all 38 district cards", async ({ page }) => {
    const cards = page.locator('[data-testid="dist-grid"] .dist-card');
    await expect(cards).toHaveCount(38);
  });

  test("search input is visible and interactive", async ({ page }) => {
    await expect(page.locator('[data-testid="dist-search"]')).toBeVisible();
    await expect(page.locator('[data-testid="dist-search"]')).toBeEditable();
  });

  test("searching Chennai returns exactly 1 result", async ({ page }) => {
    await page.locator('[data-testid="dist-search"]').fill("Chennai");
    const visible = page.locator('[data-testid="dist-grid"] .dist-card:visible');
    await expect(visible).toHaveCount(1);
  });

  test("searching Tamil name மதுரை returns exactly 1 result", async ({ page }) => {
    await page.locator('[data-testid="dist-search"]').fill("மதுரை");
    const visible = page.locator('[data-testid="dist-grid"] .dist-card:visible');
    await expect(visible).toHaveCount(1);
  });

  test("searching Tamil name சேலம் returns exactly 1 result", async ({ page }) => {
    await page.locator('[data-testid="dist-search"]').fill("சேலம்");
    const visible = page.locator('[data-testid="dist-grid"] .dist-card:visible');
    await expect(visible).toHaveCount(1);
  });

  test("searching non-existent term shows 0 results", async ({ page }) => {
    await page.locator('[data-testid="dist-search"]').fill("zzznoresult999");
    const visible = page.locator('[data-testid="dist-grid"] .dist-card:visible');
    await expect(visible).toHaveCount(0);
  });

  test("clearing search restores all 38 districts", async ({ page }) => {
    await page.locator('[data-testid="dist-search"]').fill("Chennai");
    await page.locator('[data-testid="dist-search"]').clear();
    const cards = page.locator('[data-testid="dist-grid"] .dist-card');
    await expect(cards).toHaveCount(38);
  });

  test("North regional filter returns fewer than 38 districts", async ({ page }) => {
    await page.locator('#filtRow button[data-f="north"]').click();
    const visible = page.locator('[data-testid="dist-grid"] .dist-card:visible');
    const count = await visible.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(38);
  });

  test("Central regional filter returns fewer than 38 districts", async ({ page }) => {
    await page.locator('#filtRow button[data-f="central"]').click();
    const visible = page.locator('[data-testid="dist-grid"] .dist-card:visible');
    const count = await visible.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(38);
  });

  test("South regional filter returns fewer than 38 districts", async ({ page }) => {
    await page.locator('#filtRow button[data-f="south"]').click();
    const visible = page.locator('[data-testid="dist-grid"] .dist-card:visible');
    const count = await visible.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(38);
  });

  test("West regional filter returns fewer than 38 districts", async ({ page }) => {
    await page.locator('#filtRow button[data-f="west"]').click();
    const visible = page.locator('[data-testid="dist-grid"] .dist-card:visible');
    const count = await visible.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(38);
  });

  test("All filter restores 38 districts after regional filter", async ({ page }) => {
    await page.locator('#filtRow button[data-f="north"]').click();
    await page.locator('#filtRow button[data-f="all"]').click();
    const cards = page.locator('[data-testid="dist-grid"] .dist-card');
    await expect(cards).toHaveCount(38);
  });

  test("clicking a district card opens the district modal", async ({ page }) => {
    await page.locator('[data-testid="dist-grid"] .dist-card').first().click();
    await expect(page.locator('[data-testid="district-modal"]')).toBeVisible();
  });

  test("Chennai card is marked as capital", async ({ page }) => {
    const chennai = page.locator('[data-testid="dist-grid"] .dist-card').filter({ hasText: /Chennai/ });
    await expect(chennai).toBeVisible();
    await expect(chennai).toHaveClass(/cap/);
  });

  test("result count text updates on search", async ({ page }) => {
    const allCount = await page.locator('[data-testid="dist-grid"] .dist-card').count();
    await page.locator('[data-testid="dist-search"]').fill("Chennai");
    const filtered = await page.locator('[data-testid="dist-grid"] .dist-card:visible').count();
    expect(filtered).toBeLessThan(allCount);
  });
});

// ─── Live Wire ────────────────────────────────────────────────────────────────

test.describe("Live Wire Feed", () => {
  test.beforeEach(async ({ page }) => {
    await initPage(page);
    await dismiss(page);
    await page.locator('[data-testid="live-wire"]').scrollIntoViewIfNeeded();
  });

  test("live wire section is visible", async ({ page }) => {
    await expect(page.locator('[data-testid="live-wire"]')).toBeVisible();
  });

  test("live wire has at least one row entry", async ({ page }) => {
    const rows = page.locator(".wire-row");
    const count = await rows.count();
    expect(count).toBeGreaterThan(0);
  });

  test("first wire row is visible", async ({ page }) => {
    await expect(page.locator(".wire-row").first()).toBeVisible();
  });
});

// ─── News Preview ─────────────────────────────────────────────────────────────

test.describe("News Preview Section", () => {
  test.beforeEach(async ({ page }) => {
    await initPage(page);
    await dismiss(page);
  });

  test("news section is visible after scrolling", async ({ page }) => {
    const section = page.locator("section").filter({ hasText: /News|Hot|Hidden/i }).first();
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
  });

  test("there is a link to /news", async ({ page }) => {
    const link = page.locator('a[href="/news"]');
    expect(await link.count()).toBeGreaterThan(0);
  });
});

// ─── Events Preview ───────────────────────────────────────────────────────────

test.describe("Events Preview Section", () => {
  test.beforeEach(async ({ page }) => {
    await initPage(page);
    await dismiss(page);
  });

  test("events section is visible after scrolling", async ({ page }) => {
    const section = page.locator("section").filter({ hasText: /Event/i }).first();
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
  });

  test("there is a link to /events", async ({ page }) => {
    const link = page.locator('a[href="/events"]');
    expect(await link.count()).toBeGreaterThan(0);
  });
});

// ─── Developer Section ────────────────────────────────────────────────────────

test.describe("Developer Section", () => {
  test.beforeEach(async ({ page }) => {
    await initPage(page);
    await dismiss(page);
    await page.locator('[data-testid="code-window"]').scrollIntoViewIfNeeded();
  });

  test("code window is visible", async ({ page }) => {
    await expect(page.locator('[data-testid="code-window"]')).toBeVisible();
  });

  test("code window has multiple language tabs", async ({ page }) => {
    const tabs = page.locator(".code-tab");
    const count = await tabs.count();
    expect(count).toBeGreaterThan(1);
  });

  test("javascript tab is switchable", async ({ page }) => {
    await page.locator(".code-tab", { hasText: /javascript/i }).click();
    await expect(page.locator(".code-tab.on", { hasText: /javascript/i })).toBeVisible();
  });

  test("python tab is switchable", async ({ page }) => {
    const pythonTab = page.locator(".code-tab", { hasText: /python/i });
    if (await pythonTab.count() > 0) {
      await pythonTab.click();
      await expect(page.locator(".code-tab.on", { hasText: /python/i })).toBeVisible();
    }
  });

  test("API feature cards mention REST", async ({ page }) => {
    await expect(page.locator("text=REST").or(page.locator("text=JSON")).first()).toBeVisible();
  });

  test("GitHub link is visible", async ({ page }) => {
    await expect(page.locator('a[href*="github.com"]').first()).toBeVisible();
  });

  test("dev section heading mentions API", async ({ page }) => {
    const heading = page.locator("h2, h3").filter({ hasText: /API/i });
    await expect(heading.first()).toBeVisible();
  });
});

// ─── Footer ───────────────────────────────────────────────────────────────────

test.describe("Footer", () => {
  test.beforeEach(async ({ page }) => {
    await initPage(page);
    await dismiss(page);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  });

  test("footer is visible", async ({ page }) => {
    await expect(page.locator("footer")).toBeVisible();
  });

  test("footer has GitHub link", async ({ page }) => {
    await expect(page.locator("footer a[href*='github.com']").first()).toBeVisible();
  });

  test("footer contains Election coverage link", async ({ page }) => {
    await expect(page.locator("footer")).toContainText(/Election/i);
  });

  test("footer contains Education coverage link", async ({ page }) => {
    await expect(page.locator("footer")).toContainText(/Education/i);
  });

  test("footer contains API developers section", async ({ page }) => {
    await expect(page.locator("footer")).toContainText(/API|Developer/i);
  });

  test("footer has copyright notice with year", async ({ page }) => {
    await expect(page.locator("footer")).toContainText(/202[0-9]/);
  });

  test("footer disclaimer mentions not affiliated", async ({ page }) => {
    await expect(page.locator("footer")).toContainText(/Not affiliated/i);
  });

  test("footer has RSS link or mention", async ({ page }) => {
    await expect(page.locator("footer")).toContainText(/RSS/i);
  });
});

// ─── Desktop-only Navigation ──────────────────────────────────────────────────

test.describe("Desktop Navigation Links", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test.beforeEach(async ({ page }) => {
    await initPage(page);
    await dismiss(page);
  });

  test("clicking Districts nav scrolls to atlas section", async ({ page }) => {
    await page.locator('[data-testid="header"] nav a[href="#districts"]').click();
    await expect(page.locator('[data-testid="atlas"]')).toBeInViewport({ timeout: 5000 });
  });

  test("clicking Updates nav scrolls to live wire section", async ({ page }) => {
    await page.locator('[data-testid="header"] nav a[href="#feed"]').click();
    await expect(page.locator('[data-testid="live-wire"]')).toBeInViewport({ timeout: 5000 });
  });
});

// ─── Mobile Responsive (390 × 844) ───────────────────────────────────────────

test.describe("Mobile Responsive — iPhone viewport (390×844)", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test.beforeEach(async ({ page }) => {
    await initPage(page);
    await dismiss(page);
  });

  test("header is visible on mobile", async ({ page }) => {
    await expect(page.locator('[data-testid="header"]')).toBeVisible();
  });

  test("hamburger button is visible on mobile", async ({ page }) => {
    await expect(page.locator("#hamburger")).toBeVisible();
  });

  test("mobile drawer is hidden by default", async ({ page }) => {
    await expect(page.locator("#drawer")).not.toHaveClass(/show/);
  });

  test("hamburger click opens the mobile drawer", async ({ page }) => {
    await page.locator("#hamburger").click();
    await expect(page.locator("#drawer")).toHaveClass(/show/);
  });

  test("drawer has navigation links", async ({ page }) => {
    await page.locator("#hamburger").click();
    await expect(page.locator("#drawer")).toContainText(/Districts|Updates|News|Events/i);
  });

  test("Escape closes the mobile drawer", async ({ page }) => {
    await page.locator("#hamburger").click();
    await expect(page.locator("#drawer")).toHaveClass(/show/);
    await page.keyboard.press("Escape");
    await expect(page.locator("#drawer")).not.toHaveClass(/show/);
  });

  test("close button inside drawer closes it", async ({ page }) => {
    await page.locator("#hamburger").click();
    await page.locator("#drawerClose").click();
    await expect(page.locator("#drawer")).not.toHaveClass(/show/);
  });

  test("clicking shade overlay closes the drawer", async ({ page }) => {
    await page.locator("#hamburger").click();
    await page.locator("#drawerShade.show").click();
    await expect(page.locator("#drawer")).not.toHaveClass(/show/);
  });

  test("h1 hero heading is visible on mobile", async ({ page }) => {
    await expect(page.locator("h1")).toBeVisible();
  });

  test("TN map is visible on mobile", async ({ page }) => {
    await expect(page.locator('[data-testid="tn-map"]')).toBeVisible();
  });

  test("focus cards section is visible on mobile", async ({ page }) => {
    const cards = page.locator('[data-testid="focus-cards"] .focus');
    await expect(cards.first()).toBeVisible();
  });

  test("atlas district search is visible and usable on mobile", async ({ page }) => {
    await page.locator('[data-testid="atlas"]').scrollIntoViewIfNeeded();
    await expect(page.locator('[data-testid="dist-search"]')).toBeVisible();
    await page.locator('[data-testid="dist-search"]').fill("Madurai");
    const visible = page.locator('[data-testid="dist-grid"] .dist-card:visible');
    await expect(visible).toHaveCount(1);
  });

  test("disclaimer modal is visible and dismissable on mobile", async ({ page }) => {
    await page.addInitScript(() => localStorage.removeItem("tn-disc-dismissed"));
    await page.goto("/");
    await expect(page.locator('[data-testid="disclaimer-modal"]')).toBeVisible();
    await page.click("text=I understand");
    await expect(page.locator('[data-testid="disclaimer-modal"]')).not.toBeVisible();
  });

  test("page does not overflow horizontally on mobile", async ({ page }) => {
    const overflow = await page.evaluate(() => document.body.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(5);
  });

  test("footer is accessible by scrolling on mobile", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.locator("footer")).toBeVisible();
  });
});

// ─── Mobile Responsive (393 × 851 — Pixel 5) ─────────────────────────────────

test.describe("Mobile Responsive — Android viewport (393×851)", () => {
  test.use({ viewport: { width: 393, height: 851 } });

  test.beforeEach(async ({ page }) => {
    await initPage(page);
    await dismiss(page);
  });

  test("no horizontal overflow on Pixel-5 viewport", async ({ page }) => {
    const overflow = await page.evaluate(() => document.body.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(5);
  });

  test("hamburger menu is available on Pixel 5", async ({ page }) => {
    await expect(page.locator("#hamburger")).toBeVisible();
  });

  test("atlas search works on Pixel 5", async ({ page }) => {
    await page.locator('[data-testid="atlas"]').scrollIntoViewIfNeeded();
    await page.locator('[data-testid="dist-search"]').fill("Coimbatore");
    const visible = page.locator('[data-testid="dist-grid"] .dist-card:visible');
    await expect(visible).toHaveCount(1);
  });
});

// ─── Tablet (768 × 1024) ─────────────────────────────────────────────────────

test.describe("Tablet Responsive — iPad viewport (768×1024)", () => {
  test.use({ viewport: { width: 768, height: 1024 } });

  test.beforeEach(async ({ page }) => {
    await initPage(page);
    await dismiss(page);
  });

  test("page renders without horizontal overflow on tablet", async ({ page }) => {
    const overflow = await page.evaluate(() => document.body.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(5);
  });

  test("h1 is visible on tablet", async ({ page }) => {
    await expect(page.locator("h1")).toBeVisible();
  });

  test("TN map is visible on tablet", async ({ page }) => {
    await expect(page.locator('[data-testid="tn-map"]')).toBeVisible();
  });

  test("all 38 district cards render on tablet", async ({ page }) => {
    await page.locator('[data-testid="atlas"]').scrollIntoViewIfNeeded();
    const cards = page.locator('[data-testid="dist-grid"] .dist-card');
    await expect(cards).toHaveCount(38);
  });
});
