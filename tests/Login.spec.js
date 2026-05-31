const { test, expect, beforeEach } = require('@playwright/test');
const LoginPage = require('../pages/loginpage');
const config = require('../config/config');

test.describe('Admin Login Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.waitForLoginForm();
  });

  test('should display login form', async ({ page }) => {
    const isVisible = await loginPage.isLoginFormVisible();
    expect(isVisible).toBe(true);
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await loginPage.login(
      config.testData.user.email,
      config.testData.user.password
    );
    
    await page.waitForURL('**/admin/dashboard**', { timeout: 10000 });
    expect(page.url()).toContain('/admin/dashboard');
  });

  test('should show error with invalid email', async ({ page }) => {
    await loginPage.login('invalid@email.com', config.testData.user.password);
    const errorMessage = await page.locator('//error-selector').textContent();
    expect(errorMessage).toContain('Invalid credentials');
  });

  test('should show error with invalid password', async ({ page }) => {
    await loginPage.login(config.testData.user.email, 'wrongpassword');
    const errorMessage = await page.locator('//error-selector').textContent();
    expect(errorMessage).toContain('Invalid credentials');
  });

  test('should show error with empty credentials', async ({ page }) => {
    await loginPage.clickSubmit();
    const errorMessage = await page.locator('//error-selector').textContent();
    expect(errorMessage).toContain('Email is required');
  });

  test('should be able to fill email field', async ({ page }) => {
    await loginPage.enterEmail(config.testData.user.email);
    const emailValue = await page.locator(loginPage.emailInput).inputValue();
    expect(emailValue).toBe(config.testData.user.email);
  });

  test('should be able to fill password field', async ({ page }) => {
    await loginPage.enterPassword(config.testData.user.password);
    const passwordValue = await page.locator(loginPage.passwordInput).inputValue();
    expect(passwordValue).toBe(config.testData.user.password);
  });
});
