const { test, expect } = require('@playwright/test');

const GetStartedPage = require('../pageObjects/GetStartedPage');

// Configuration
const TEST_EMAIL = 'test@example.com';
const INVALID_EMAIL = 'invalid-email';

// Setup
test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
});

test.afterEach(async ({ context }) => {
  await context.close();
});

// Positive Test Scenarios
test.describe('Get Started Positive Scenarios', () => {
  test('User can start the signup process', async ({ page }) => {
    const getStartedPage = new GetStartedPage(page);
    await getStartedPage.navigate();
    await getStartedPage.clickGetStarted();
    await getStartedPage.clickContinueWithEmail();
    await getStartedPage.signUpWithEmail(TEST_EMAIL);
    await expect(page).toHaveURL(/.*signup.*/);
  });
});

// Negative Test Scenarios
test.describe('Get Started Negative Scenarios', () => {
  test('Start signup with invalid email', async ({ page }) => {
    const getStartedPage = new GetStartedPage(page);
    await getStartedPage.navigate();
    await getStartedPage.clickGetStarted();
    await getStartedPage.clickContinueWithEmail();
    await getStartedPage.signUpWithEmail(INVALID_EMAIL);
    const errorMessage = await getStartedPage.getErrorMessage();
    expect(errorMessage).toContain('Please provide a valid email address.');
  });
});


// Cleanup
test.afterAll(async ({ browser }) => {
  await browser.close();
});