import 'dotenv/config'
import { defineConfig } from '@playwright/test'

export default defineConfig({
  // testDir: './tests',
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { outputFile: 'results.html' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: false,
    viewport: { width: 1920, height: 1080 },
    trace: 'on',
    video: 'on',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
    },
  ],
})
