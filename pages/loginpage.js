import BasePage from './basepage';

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Login URL
    this.loginUrl = 'https://microsoft.pratyusha.com.np/admin/auth/login';
    
    // Locators
    this.emailInput = "//input[@type='email']";
    this.passwordInput = "//input[@type='password']";
    this.submitButton = "//button[@type='submit']";
  }

  async navigateToLogin() {
    await this.page.goto(this.loginUrl);
  }

  async enterEmail(email) {
    await this.fillElement(this.emailInput, email);
  }

  async enterPassword(password) {
    await this.fillElement(this.passwordInput, password);
  }

  async clickSubmit() {
    await this.clickElement(this.submitButton);
  }

  async login(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSubmit();
  }

  async waitForLoginForm() {
    await this.waitForElement(this.emailInput);
  }

  async isLoginFormVisible() {
    return await this.isElementVisible(this.emailInput);
  }
}

module.exports = LoginPage;