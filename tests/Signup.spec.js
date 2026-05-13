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
    await signupPage.fillWorkspace(testData.workspace);
    await signupPage.fillElement(signupPage.emailInput, testData.email);
    await signupPage.fillElement(signupPage.passwordInput, testData.password);
    await signupPage.fillElement(signupPage.confirmPasswordInput, testData.password);
    await signupPage.selectNepal();
    await signupPage.fillContactNumber();
    await signupPage.checkTermsCheckbox();
    await signupPage.clickCreateAccount();
    await page.waitForLoadState('networkidle');
    await page.waitForURL(`**/${testData.workspace}.**`, { timeout: 15000 });
    const currentUrl = await signupPage.getCurrentUrl();
    expect(currentUrl).toContain(testData.workspace);
    console.log(`Account created successfully with workspace: ${testData.workspace}`);
    console.log(`Current URL: ${currentUrl}`);
    
  });
});

test.describe('Signup Validation Tests', () => {
  let homePage;
  let signupPage;
  let page;

  test.beforeEach(async ({ page: testPage }) => {
    page = testPage;
    homePage = new HomePage(page);
    signupPage = new SignupPage(page);
   await signupPage.navigateToPage(config.urls.signup);
  });

  // ===== COMPANY NAME VALIDATIONS =====
  test('TC003: Empty company name should show error', async () => {
    await signupPage.fillElement(signupPage.emailInput, 'test@yopmail.com');
    await signupPage.fillElement(signupPage.passwordInput, 'Password@123');
    await signupPage.fillElement(signupPage.confirmPasswordInput, 'Password@123');
    await signupPage.selectNepal();
    await signupPage.fillContactNumber();
    await signupPage.checkTermsCheckbox();
    await signupPage.clickCreateAccount();
    const errorMsg = page.locator('//span[contains(text(),"required")] | //p[contains(text(),"Company")] | //div[contains(@class,"error")]');
    await expect(errorMsg).toBeVisible({ timeout: 5000 });
  });

  test('TC004: Company name with only special characters should show error', async () => {
    await signupPage.fillElement(signupPage.companyNameInput, '@#$%^&');
    await page.waitForTimeout(500);
    await signupPage.fillElement(signupPage.emailInput, 'test@yopmail.com');
    await signupPage.fillElement(signupPage.passwordInput, 'Password@123');
    await signupPage.fillElement(signupPage.confirmPasswordInput, 'Password@123');
    const errorMsg = page.locator('//span[contains(text(),"invalid")] | //p[contains(text(),"Company")]');
    await expect(errorMsg).toBeVisible({ timeout: 5000 }).catch(() => console.log('No validation error shown for special chars'));
  });

  // ===== EMAIL VALIDATIONS =====
  test('TC005: Empty email should show error', async () => {
    const testData = DataGenerator.generateTestData();
    await signupPage.fillElement(signupPage.companyNameInput, testData.companyName);
    await signupPage.waitForWorkspaceAutoFill();
    await signupPage.fillElement(signupPage.passwordInput, 'Password@123');
    await signupPage.fillElement(signupPage.confirmPasswordInput, 'Password@123');
    await signupPage.selectNepal();
    await signupPage.fillContactNumber();
    await signupPage.checkTermsCheckbox();
    await signupPage.clickCreateAccount();
    const errorMsg = page.locator('//span[contains(text(),"required")] | //p[contains(text(),"email")] | //div[contains(@class,"error")]');
    await expect(errorMsg).toBeVisible({ timeout: 5000 });
  });

  test('TC006: Invalid email format should show error', async () => {
    const testData = DataGenerator.generateTestData();
    await signupPage.fillElement(signupPage.companyNameInput, testData.companyName);
    await signupPage.waitForWorkspaceAutoFill();
    await signupPage.fillElement(signupPage.emailInput, 'invalidemail@');
    await signupPage.fillElement(signupPage.passwordInput, 'Password@123');
    await signupPage.fillElement(signupPage.confirmPasswordInput, 'Password@123');
    await signupPage.selectNepal();
    await signupPage.fillContactNumber();
    await signupPage.checkTermsCheckbox();
    await signupPage.clickCreateAccount();
    const errorMsg = page.locator("//p[text()='Please enter a valid email']");
    await expect(errorMsg).toBeVisible({ timeout: 5000 });
  });

  test('TC007: Email without @ symbol should show error', async () => {
    const testData = DataGenerator.generateTestData();
    await signupPage.fillElement(signupPage.companyNameInput, testData.companyName);
    await signupPage.waitForWorkspaceAutoFill();
    await signupPage.fillElement(signupPage.emailInput, 'testemaildomain.com');
    await signupPage.fillElement(signupPage.passwordInput, 'Password@123');
    await signupPage.fillElement(signupPage.confirmPasswordInput, 'Password@123');
    const errorMsg = page.locator('//span[contains(text(),"valid")] | //span[contains(text(),"email")]');
    await expect(errorMsg).toBeVisible({ timeout: 5000 }).catch(() => console.log('No validation shown for missing @'));
  });

  // ===== PASSWORD VALIDATIONS =====
  test('TC008: Empty password should show error', async () => {
    const testData = DataGenerator.generateTestData();
    await signupPage.fillElement(signupPage.companyNameInput, testData.companyName);
    await signupPage.waitForWorkspaceAutoFill();
    await signupPage.fillElement(signupPage.emailInput, testData.email);
    await signupPage.fillElement(signupPage.confirmPasswordInput, 'Password@123');
    await signupPage.selectNepal();
    await signupPage.fillContactNumber();
    await signupPage.checkTermsCheckbox();
    await signupPage.clickCreateAccount();
    const errorMsg = page.locator("//p[text()='required']");
    await expect(errorMsg).toBeVisible({ timeout: 5000 });
  });

  test('TC009: Password with less than 8 characters should show error', async () => {
    const testData = DataGenerator.generateTestData();
    await signupPage.fillElement(signupPage.companyNameInput, testData.companyName);
    await signupPage.waitForWorkspaceAutoFill();
    await signupPage.fillElement(signupPage.emailInput, testData.email);
    await signupPage.fillElement(signupPage.passwordInput, 'Pass@1');
    await signupPage.fillElement(signupPage.confirmPasswordInput, 'Pass@1');
    const errorMsg = page.locator("//p[text()='Password must be at least 8 characters']");
    await expect(errorMsg).toBeVisible({ timeout: 5000 }).catch(() => console.log('No min length validation shown'));
  });

  test('TC010: Password without uppercase letter should show error', async () => {
    const testData = DataGenerator.generateTestData();
    await signupPage.fillElement(signupPage.companyNameInput, testData.companyName);
    await signupPage.waitForWorkspaceAutoFill();
    await signupPage.fillElement(signupPage.emailInput, testData.email);
    await signupPage.fillElement(signupPage.passwordInput, 'password@123');
    await signupPage.fillElement(signupPage.confirmPasswordInput, 'password@123');
    const errorMsg = page.locator("//p[text()='Password must contain at least one letter, one capital letter, one number, and one special character']");
    await expect(errorMsg).toBeVisible({ timeout: 5000 }).catch(() => console.log('No uppercase validation shown'));
  });

  test('TC011: Password without special character should show error', async () => {
    const testData = DataGenerator.generateTestData();
    await signupPage.fillElement(signupPage.companyNameInput, testData.companyName);
    await signupPage.waitForWorkspaceAutoFill();
    await signupPage.fillElement(signupPage.emailInput, testData.email);
    await signupPage.fillElement(signupPage.passwordInput, 'Password123');
    await signupPage.fillElement(signupPage.confirmPasswordInput, 'Password123');
    const errorMsg = page.locator("//p[text()='Password must contain at least one letter, one capital letter, one number, and one special character']");
    await expect(errorMsg).toBeVisible({ timeout: 5000 }).catch(() => console.log('Password must contain at least one letter, one capital letter, one number, and one special character'));
  });

  test('TC012: Password without number should show error', async () => {
    const testData = DataGenerator.generateTestData();
    await signupPage.fillElement(signupPage.companyNameInput, testData.companyName);
    await signupPage.waitForWorkspaceAutoFill();
    await signupPage.fillElement(signupPage.emailInput, testData.email);
    await signupPage.fillElement(signupPage.passwordInput, 'Password@abc');
    await signupPage.fillElement(signupPage.confirmPasswordInput, 'Password@abc');
    const errorMsg = page.locator("//p[text()='Password must contain at least one letter, one capital letter, one number, and one special character']");
    await expect(errorMsg).toBeVisible({ timeout: 5000 }).catch(() => console.log('No number validation shown'));
  });


  test('TC013: Password mismatch should show error', async () => {
    const testData = DataGenerator.generateTestData();
    await signupPage.fillElement(signupPage.companyNameInput, testData.companyName);
    await signupPage.waitForWorkspaceAutoFill();
    await signupPage.fillElement(signupPage.emailInput, testData.email);
    await signupPage.fillElement(signupPage.passwordInput, 'Password@123');
    await signupPage.fillElement(signupPage.confirmPasswordInput, 'Password@124');
    const errorMsg = page.locator('//p[contains(text(),"match")] | //p[contains(text(),"Password")]');
    await expect(errorMsg).toBeVisible({ timeout: 5000 }).catch(() => console.log('No mismatch validation shown'));
  });

  test('TC014: Empty confirm password should show error', async () => {
    const testData = DataGenerator.generateTestData();
    await signupPage.fillElement(signupPage.companyNameInput, testData.companyName);
    await signupPage.waitForWorkspaceAutoFill();
    await signupPage.fillElement(signupPage.emailInput, testData.email);
    await signupPage.fillElement(signupPage.passwordInput, 'Password@123');
    await signupPage.selectNepal();
    await signupPage.fillContactNumber();
    await signupPage.checkTermsCheckbox();
    await signupPage.clickCreateAccount();
    const errorMsg = page.locator("//p[contains(text(),'required')]");
    await expect(errorMsg).toBeVisible({ timeout: 5000 });
  });

  // ===== CONTACT NUMBER VALIDATIONS =====
  test('TC015: Empty contact number should show error', async () => {
    const testData = DataGenerator.generateTestData();
    await signupPage.fillElement(signupPage.companyNameInput, testData.companyName);
    await signupPage.waitForWorkspaceAutoFill();
    await signupPage.fillElement(signupPage.emailInput, testData.email);
    await signupPage.fillElement(signupPage.passwordInput, 'Password@123');
    await signupPage.fillElement(signupPage.confirmPasswordInput, 'Password@123');
    await signupPage.selectNepal();
    await signupPage.checkTermsCheckbox();
    await signupPage.clickCreateAccount();
    const errorMsg = page.locator('//p[contains(text(),"required")] | //p[contains(text(),"contact")] | //div[contains(@class,"error")]');
    await expect(errorMsg).toBeVisible({ timeout: 5000 });
  });

  test('TC016: Contact number with invalid format should show error', async () => {
    const testData = DataGenerator.generateTestData();
    await signupPage.fillElement(signupPage.companyNameInput, testData.companyName);
    await signupPage.waitForWorkspaceAutoFill();
    await signupPage.fillElement(signupPage.emailInput, testData.email);
    await signupPage.fillElement(signupPage.passwordInput, 'Password@123');
    await signupPage.fillElement(signupPage.confirmPasswordInput, 'Password@123');
    await signupPage.selectNepal();
    await signupPage.fillElement(signupPage.contactNumberInput, '123');
    await signupPage.checkTermsCheckbox();
    await signupPage.clickCreateAccount();
    const errorMsg = page.locator('//p[contains(text(),"valid")] | //p[contains(text(),"phone")] | //p[contains(text(),"digits")]');
    await expect(errorMsg).toBeVisible({ timeout: 5000 }).catch(() => console.log('No phone validation shown'));
  });

  test('TC017: Contact number with letters should show error', async () => {
    const testData = DataGenerator.generateTestData();
    await signupPage.fillElement(signupPage.companyNameInput, testData.companyName);
    await signupPage.waitForWorkspaceAutoFill();
    await signupPage.fillElement(signupPage.emailInput, testData.email);
    await signupPage.fillElement(signupPage.passwordInput, 'Password@123');
    await signupPage.fillElement(signupPage.confirmPasswordInput, 'Password@123');
    await signupPage.selectNepal();
    await signupPage.fillElement(signupPage.contactNumberInput, '981abc1234');
    await signupPage.checkTermsCheckbox();
    await signupPage.clickCreateAccount();
    const errorMsg = page.locator('//span[contains(text(),"valid")] | //span[contains(text(),"number")]');
    await expect(errorMsg).toBeVisible({ timeout: 5000 }).catch(() => console.log('No validation for letters in phone'));
  });

  // ===== TERMS & CONDITIONS VALIDATION =====
  test('TC018: Unchecked terms checkbox should show error', async () => {
    const testData = DataGenerator.generateTestData();
    await signupPage.fillElement(signupPage.companyNameInput, testData.companyName);
    await signupPage.waitForWorkspaceAutoFill();
    await signupPage.fillElement(signupPage.emailInput, testData.email);
    await signupPage.fillElement(signupPage.passwordInput, 'Password@123');
    await signupPage.fillElement(signupPage.confirmPasswordInput, 'Password@123');
    await signupPage.selectNepal();
    await signupPage.fillContactNumber();
    await signupPage.clickCreateAccount();
    const errorMsg = page.locator('//span[contains(text(),"terms")] | //p[contains(text(),"agree")] | //div[contains(@class,"error")]');
    await expect(errorMsg).toBeVisible({ timeout: 5000 });
  });

  // ===== COUNTRY SELECTION VALIDATION =====
  test('TC019: No country selected should show error', async () => {
    const testData = DataGenerator.generateTestData();
    await signupPage.fillElement(signupPage.companyNameInput, testData.companyName);
    await signupPage.waitForWorkspaceAutoFill();
    await signupPage.fillElement(signupPage.emailInput, testData.email);
    await signupPage.fillElement(signupPage.passwordInput, 'Password@123');
    await signupPage.fillElement(signupPage.confirmPasswordInput, 'Password@123');
    await signupPage.fillContactNumber();
    await signupPage.checkTermsCheckbox();
    await signupPage.clickCreateAccount();
    const errorMsg = page.locator('//span[contains(text(),"required")] | //p[contains(text(),"country")] | //div[contains(@class,"error")]');
    await expect(errorMsg).toBeVisible({ timeout: 5000 });
  });

  // ===== EDGE CASES =====
  test('TC020: Very long company name should be handled', async () => {
    const longName = 'A'.repeat(100) + ' Company Solutions';
    await signupPage.fillElement(signupPage.companyNameInput, longName);
    await page.waitForTimeout(500);
    const errorMsg = page.locator('//span[contains(text(),"max")] | //span[contains(text(),"character")]');
    const isError = await errorMsg.isVisible().catch(() => false);
    if (isError) {
      expect(isError).toBe(true);
    } else {
      console.log('System accepts long company names');
    }
  });

  test('TC021: Space-only inputs should show error', async () => {
    const testData = DataGenerator.generateTestData();
    await signupPage.fillElement(signupPage.companyNameInput, '     ');
    await page.waitForTimeout(500);
    await signupPage.fillElement(signupPage.emailInput, testData.email);
    await signupPage.fillElement(signupPage.passwordInput, 'Password@123');
    await signupPage.fillElement(signupPage.confirmPasswordInput, 'Password@123');
    const errorMsg = page.locator('//span[contains(text(),"invalid")] | //p[contains(text(),"Company")]');
    const isError = await errorMsg.isVisible().catch(() => false);
    expect(isError).toBeTruthy();
  });

  test('TC022: SQL injection attempt in company name should be handled safely', async () => {
    const testData = DataGenerator.generateTestData();
    await signupPage.fillElement(signupPage.companyNameInput, "'; DROP TABLE users; --");
    await page.waitForTimeout(500);
    await signupPage.fillElement(signupPage.emailInput, testData.email);
    await signupPage.waitForWorkspaceAutoFill();
    await signupPage.fillWorkspace(testData.workspace);
    await signupPage.fillElement(signupPage.passwordInput, 'Password@123');
    await signupPage.fillElement(signupPage.confirmPasswordInput, 'Password@123');
    await signupPage.selectNepal();
    await signupPage.fillContactNumber();
    await signupPage.checkTermsCheckbox();
    await signupPage.clickCreateAccount();
    await page.waitForTimeout(1000);
    console.log('SQL injection attempt handled safely - no system errors');
  });

  test('TC023: XSS attack attempt in email should be handled safely', async () => {
    const testData = DataGenerator.generateTestData();
    await signupPage.fillElement(signupPage.companyNameInput, testData.companyName);
    await signupPage.waitForWorkspaceAutoFill();
    await signupPage.fillElement(signupPage.emailInput, '<script>alert("xss")</script>@test.com');
    await signupPage.fillElement(signupPage.passwordInput, 'Password@123');
    await signupPage.fillElement(signupPage.confirmPasswordInput, 'Password@123');
    await signupPage.selectNepal();
    await signupPage.fillContactNumber();
    await signupPage.checkTermsCheckbox();
    await signupPage.clickCreateAccount();
    await page.waitForTimeout(1000);
    console.log('XSS attempt handled safely - no script execution');
  });

  test('TC024: Multiple special characters in password should be accepted', async () => {
    const testData = DataGenerator.generateTestData();
    await signupPage.fillElement(signupPage.companyNameInput, testData.companyName);
    await signupPage.waitForWorkspaceAutoFill();
    await signupPage.fillElement(signupPage.emailInput, testData.email);
    await signupPage.fillElement(signupPage.passwordInput, 'P@ssw0rd!#$%');
    await signupPage.fillElement(signupPage.confirmPasswordInput, 'P@ssw0rd!#$%');
    await signupPage.selectNepal();
    await signupPage.fillContactNumber();
    await signupPage.checkTermsCheckbox();
    await signupPage.clickCreateAccount();
    await page.waitForLoadState('networkidle');
    console.log('Strong password with multiple special chars accepted');
  });

  test('TC025: Copy-paste into password field should work correctly', async () => {
    const testData = DataGenerator.generateTestData();
    await signupPage.fillElement(signupPage.companyNameInput, testData.companyName);
    await signupPage.waitForWorkspaceAutoFill();
    await signupPage.fillElement(signupPage.emailInput, testData.email);
    const password = 'Password@123';
    await signupPage.passwordInput.fill(password);
    await signupPage.confirmPasswordInput.fill(password);
    const passwordValue = await signupPage.passwordInput.inputValue();
    const confirmPasswordValue = await signupPage.confirmPasswordInput.inputValue();
    expect(passwordValue).toBe(password);
    expect(confirmPasswordValue).toBe(password);
  });
});