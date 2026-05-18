import { defineConfig, devices } from "@playwright/test";

/**
 * Root-level config — runs ALL 3 apps sequentially, one test at a time.
 * Starts all 3 dev servers automatically before the test run.
 *
 * Usage:
 *   pnpm test:all              → headless
 *   pnpm test:all --headed     → headed (watch mode)
 *   pnpm test:all --ui         → Playwright UI (best for debugging)
 *
 * NOTE: global testDir + per-project testMatch is required for UI mode
 * to correctly surface all test files in the left-hand panel.
 */
export default defineConfig({
  testDir: ".",
  testMatch: "apps/*/src/e2e/**/*.spec.ts",

  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : [["list"], ["html", { open: "never" }]],
  use: {
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    // ── Web app ─────────────────────────────────────────────────────────────
    {
      name: "web · Desktop Chrome",
      testMatch: "apps/web/src/e2e/**/*.spec.ts",
      use: { ...devices["Desktop Chrome"], baseURL: "http://localhost:3000" },
    },
    {
      name: "web · Desktop Firefox",
      testMatch: "apps/web/src/e2e/**/*.spec.ts",
      use: { ...devices["Desktop Firefox"], baseURL: "http://localhost:3000" },
    },
    {
      name: "web · Pixel 5",
      testMatch: "apps/web/src/e2e/**/*.spec.ts",
      use: { ...devices["Pixel 5"], baseURL: "http://localhost:3000" },
    },
    {
      name: "web · iPhone 14",
      testMatch: "apps/web/src/e2e/**/*.spec.ts",
      use: { ...devices["iPhone 14"], baseURL: "http://localhost:3000" },
    },

    // ── Events app ──────────────────────────────────────────────────────────
    {
      name: "events · Desktop Chrome",
      testMatch: "apps/events/src/e2e/**/*.spec.ts",
      use: { ...devices["Desktop Chrome"], baseURL: "http://localhost:3001" },
    },
    {
      name: "events · Pixel 5",
      testMatch: "apps/events/src/e2e/**/*.spec.ts",
      use: { ...devices["Pixel 5"], baseURL: "http://localhost:3001" },
    },
    {
      name: "events · iPhone 14",
      testMatch: "apps/events/src/e2e/**/*.spec.ts",
      use: { ...devices["iPhone 14"], baseURL: "http://localhost:3001" },
    },

    // ── News app ────────────────────────────────────────────────────────────
    {
      name: "news · Desktop Chrome",
      testMatch: "apps/news/src/e2e/**/*.spec.ts",
      use: { ...devices["Desktop Chrome"], baseURL: "http://localhost:3002" },
    },
    {
      name: "news · Pixel 5",
      testMatch: "apps/news/src/e2e/**/*.spec.ts",
      use: { ...devices["Pixel 5"], baseURL: "http://localhost:3002" },
    },
    {
      name: "news · iPhone 14",
      testMatch: "apps/news/src/e2e/**/*.spec.ts",
      use: { ...devices["iPhone 14"], baseURL: "http://localhost:3002" },
    },
  ],

  webServer: [
    {
      name: "web",
      command: "pnpm --filter @tn-info/web dev",
      url: "http://localhost:3000",
      reuseExistingServer: !process.env.CI,
      timeout: 120000,
    },
    {
      name: "events",
      command: "pnpm --filter @tn-info/events dev",
      url: "http://localhost:3001",
      reuseExistingServer: !process.env.CI,
      timeout: 120000,
    },
    {
      name: "news",
      command: "pnpm --filter @tn-info/news dev",
      url: "http://localhost:3002",
      reuseExistingServer: !process.env.CI,
      timeout: 120000,
    },
  ],
});
