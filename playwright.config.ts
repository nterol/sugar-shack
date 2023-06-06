import { type PlaywrightTestConfig, devices } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_TEST_BASE_URL || "http://localhost:3000";
console.log(`ℹ️ Using base URL "${baseURL}"`);
const opts = {
  // launch headless on CI, in browser locally
  headless: !!process.env.CI || !!process.env.PLAYWRIGHT_HEADLESS,
  // collectCoverage: !!process.env.PLAYWRIGHT_HEADLESS
};

const config: PlaywrightTestConfig = {
  testDir: "./e2e",
  timeout: 35e3,
  outputDir: "./e2e/test-results",
  reporter: process.env.CI ? "github" : "list",
  use: {
    ...devices["Desktop Chrome"],
    baseURL,
    headless: opts.headless,
    video: "on",
  },
};

export default config;
