import { test, expect } from '@playwright/test';
import HomePage from '../pages/homepage';
import SignupPage from '../pages/signuppage';
import config from '../config/config';
import DataGenerator from '../utils/dataGenerator';

test.describe('Signup Happy Path', () => {
  let homePage;
  let signupPage;
  let page;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    homePage = new HomePage(page);
    signupPage = new SignupPage(page);
    await homePage.navigateTo(config.baseURL + config.urls.home);
  });

  test('TC001: Navigate to signup from homepage and verify form', async () => {
    await homePage.clickStartLink();
    await page.waitForLoadState('networkidle');
    await expect(signupPage.accountHeading).toBeVisible({ timeout: 10000 });
    const currentUrl = await homePage.getCurrentUrl();
    expect(currentUrl).toContain('/auth/register');
  });

  test('TC002: Fill signup form with valid data successfully', async () => {
    const testData = DataGenerator.generateTestData();
    await signupPage.navigateToPage(config.urls.signup);
    await signupPage.fillElement(signupPage.companyNameInput, testData.companyName);
    await signupPage.waitForWorkspaceAutoFill();
    await signupPage.fillElement(signupPage.emailInput, testData.email);
    await signupPage.fillElement(signupPage.passwordInput, testData.password);
    await signupPage.fillElement(signupPage.confirmPasswordInput, testData.password);
    await signupPage.selectNepal();
    await signupPage.fillContactNumber();
    await signupPage.checkTermsCheckbox();
    await signupPage.clickCreateAccount();
    await page.waitForLoadState('networkidle');
    const firstWord = testData.companyName.split(' ')[0].toLowerCase();
    await page.waitForURL(`**/${firstWord}.**`, { timeout: 15000 });
    const currentUrl = await signupPage.getCurrentUrl();
    expect(currentUrl).toContain(firstWord);
    console.log(`Account created successfully with subdomain: ${firstWord}`);
    console.log(`Current URL: ${currentUrl}`);
    
  });
});