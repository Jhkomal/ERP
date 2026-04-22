class BasePage {
  constructor(page) {
    this.page = page;
    this.config = require('../config/config');
  }

  async clickElement(selector) {
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await locator.click();
  }

  async fillElement(selector, text) {
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await locator.fill(text);
  }

  async typeText(selector, text) {
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await locator.type(text);
  }

  async getElementText(selector) {
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
    return await locator.textContent();
  }

 
  async getInputValue(selector) {
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
    return await locator.inputValue();
  }

 
  async waitForElement(selector, timeout = 5000) {
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await locator.waitFor({ state: 'visible', timeout });
  }

  async waitForElementToBeHidden(selector, timeout = 5000) {
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await locator.waitFor({ state: 'hidden', timeout });
  }

  async isElementVisible(selector) {
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
    return await locator.isVisible();
  }


  async isElementEnabled(selector) {
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
    return await locator.isEnabled();
  }

  async navigateTo(url) {
    await this.page.goto(url);
  }

 
  async navigateToPage(pagePath) {
    const url = this.config.baseURL + pagePath;
    await this.page.goto(url);
  }

  
  async goToPage(pageKey) {
    const pagePath = this.config.urls[pageKey];
    if (!pagePath) {
      throw new Error(`Page key '${pageKey}' not found in config`);
    }
    await this.navigateToPage(pagePath);
  }

  async getCurrentUrl() {
    return this.page.url();
  }


  async pressEnter(selector) {
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await locator.press('Enter');
  }

  async clearElement(selector) {
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await locator.clear();
  }

 
  async hoverElement(selector) {
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
    await locator.hover();
  }


  async getElementCount(selector) {
    const locator = typeof selector === 'string' ? this.page.locator(selector) : selector;
    return await locator.count();
  }

  
  async waitForPageLoad(timeout = 5000) {
    await this.page.waitForLoadState('networkidle', { timeout });
  }

 
  async takeScreenshot(filename) {
    await this.page.screenshot({ path: filename });
  }
}

module.exports = BasePage;
