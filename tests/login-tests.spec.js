const { test, expect } = require('@playwright/test');
const LoginPage = require('../pageObjects/LoginPage');

// Configuration
const ADMIN_USERNAME = 'dotuntestautomation@gmail.com';
const ADMIN_PASSWORD = 'P@ssword_1A';

// Setup
test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
});

test.afterEach(async ({ context }) => {
  await context.close();
});

// Positive Test Scenarios
test.describe('Positive Login Test Scenarios', () => {  
  test('Admin can login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(ADMIN_USERNAME, ADMIN_PASSWORD);
    await page.waitForURL(/.*home.*/);
    await expect(page).toHaveURL(/.*home.*/);
  });
});

// Negative Test Scenarios
test.describe('Negative Login Test Scenarios', () => {
  test('Login with incorrect password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(ADMIN_USERNAME, 'wrong-password');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('It seems you entered an incorrect password. Want to get a login link via email?');
  });

  test('Login with non-existent username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('your-admin-username', 'irrelevant');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('User does not exist. Would you like to create a new account?');
  });

  test('Login with empty username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('', 'irrelevant');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Please enter a username or email address.');
  });

  test('Login with empty password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(ADMIN_USERNAME, '');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('It seems you entered an incorrect password. Want to get a login link via email?');
  });
});

// Cleanup
test.afterAll(async ({ browser }) => {
  await browser.close();
});