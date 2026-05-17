import { test, expect } from "@playwright/test";

test.describe("TN-Info Homepage", () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test so the disclaimer always shows
    await page.addInitScript(() => {
      localStorage.removeItem("tn-disc-dismissed");
    });
    await page.goto("/");
  });

  test("disclaimer modal shows on first load", async ({ page }) => {
    await expect(page.locator('[data-testid="disclaimer-modal"]')).toBeVisible();
  });

  test("disclaimer modal dismisses on I understand click", async ({ page }) => {
    await page.click("text=I understand");
    await expect(page.locator('[data-testid="disclaimer-modal"]')).not.toBeVisible();
  });

  test("disclaimer modal dismisses on Escape key", async ({ page }) => {
    await page.keyboard.press("Escape");
    await expect(page.locator('[data-testid="disclaimer-modal"]')).not.toBeVisible();
  });

  test("header renders with nav links", async ({ page }) => {
    await page.click("text=I understand");
    const header = page.locator('[data-testid="header"]');
    await expect(header).toBeVisible();
    await expect(page.locator("nav a[href='#districts']")).toBeVisible();
    await expect(page.locator("nav a[href='#feed']")).toBeVisible();
  });

  test("language toggle switches to Tamil", async ({ page }) => {
    await page.click("text=I understand");
    const toggle = page.locator('[data-testid="lang-toggle"]');
    await toggle.locator("button[data-lang='ta']").click();
    const body = page.locator("body");
    await expect(body).toHaveAttribute("data-lang", "ta");
  });

  test("language toggle switches back to English", async ({ page }) => {
    await page.click("text=I understand");
    await page.locator('[data-testid="lang-toggle"]').locator("button[data-lang='ta']").click();
    await page.locator('[data-testid="lang-toggle"]').locator("button[data-lang='en']").click();
    await expect(page.locator("body")).toHaveAttribute("data-lang", "en");
  });

  test("stat rotator is present", async ({ page }) => {
    await page.click("text=I understand");
    await expect(page.locator('[data-testid="stat-rotator"]')).toBeVisible();
  });

  test("hero section renders headline", async ({ page }) => {
    await page.click("text=I understand");
    await expect(page.locator("h1")).toContainText("Tamil Nadu");
  });

  test("hero ticker renders updates", async ({ page }) => {
    await page.click("text=I understand");
    await expect(page.locator('[data-testid="hero-ticker"]')).toBeVisible();
  });

  test("TN map renders", async ({ page }) => {
    await page.click("text=I understand");
    await expect(page.locator('[data-testid="tn-map"]')).toBeVisible();
    // SVG paths should be present
    await expect(page.locator("svg path.tn-region").first()).toBeVisible();
  });

  test("focus cards section has 4 areas", async ({ page }) => {
    await page.click("text=I understand");
    const cards = page.locator('[data-testid="focus-cards"] .focus');
    await expect(cards).toHaveCount(4);
  });

  test("atlas renders 38 districts", async ({ page }) => {
    await page.click("text=I understand");
    await page.locator('[data-testid="atlas"]').scrollIntoViewIfNeeded();
    const cards = page.locator('[data-testid="dist-grid"] .dist-card');
    await expect(cards).toHaveCount(38);
  });

  test("atlas search filters districts", async ({ page }) => {
    await page.click("text=I understand");
    await page.locator('[data-testid="dist-search"]').fill("Chennai");
    const visible = page.locator('[data-testid="dist-grid"] .dist-card:visible');
    await expect(visible).toHaveCount(1);
  });

  test("atlas Tamil search works", async ({ page }) => {
    await page.click("text=I understand");
    await page.locator('[data-testid="dist-search"]').fill("மதுரை");
    const visible = page.locator('[data-testid="dist-grid"] .dist-card:visible');
    await expect(visible).toHaveCount(1);
  });

  test("atlas north filter shows subset", async ({ page }) => {
    await page.click("text=I understand");
    await page.locator('[data-testid="atlas"]').scrollIntoViewIfNeeded();
    await page.locator('#filtRow button[data-f="north"]').click();
    const visible = page.locator('[data-testid="dist-grid"] .dist-card:visible');
    const count = await visible.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(38);
  });

  test("live wire feed renders entries", async ({ page }) => {
    await page.click("text=I understand");
    await page.locator('[data-testid="live-wire"]').scrollIntoViewIfNeeded();
    const rows = page.locator(".wire-row");
    await expect(rows.first()).toBeVisible();
  });

  test("developer section API code window renders", async ({ page }) => {
    await page.click("text=I understand");
    await page.locator('[data-testid="code-window"]').scrollIntoViewIfNeeded();
    await expect(page.locator('[data-testid="code-window"]')).toBeVisible();
  });

  test("code window tab switching works", async ({ page }) => {
    await page.click("text=I understand");
    await page.locator('[data-testid="code-window"]').scrollIntoViewIfNeeded();
    await page.locator(".code-tab", { hasText: "javascript" }).click();
    await expect(page.locator(".code-tab.on", { hasText: "javascript" })).toBeVisible();
  });

  test("footer renders with links", async ({ page }) => {
    await page.click("text=I understand");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.locator("footer")).toBeVisible();
    await expect(
      page.locator("footer a[href='https://github.com/tamilnadu-info']").first()
    ).toBeVisible();
  });

  test("page has correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/TN-Info\.in/);
  });

  test("page has meta description", async ({ page }) => {
    const metaDesc = page.locator("meta[name='description']");
    await expect(metaDesc).toHaveAttribute("content", /Tamil Nadu/);
  });

  test("OG meta tags present", async ({ page }) => {
    await expect(page.locator("meta[property='og:title']")).toHaveAttribute(
      "content",
      /TN-Info/
    );
    await expect(page.locator("meta[property='og:type']")).toHaveAttribute("content", "website");
  });

  test("map district hover shows popover", async ({ page }) => {
    await page.click("text=I understand");
    const firstRegion = page.locator("path.tn-region").first();
    await firstRegion.hover();
    await expect(page.locator("#hpop.show")).toBeVisible();
  });
});
