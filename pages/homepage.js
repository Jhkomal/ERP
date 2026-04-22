import BasePage from './basepage';
class HomePage extends BasePage {
  constructor(page) {
    super(page);
  }

 get clickStartLink() {
    return this.page.locator('a', { hasText: /start/i });
  }
   
  async clickStartLink(){
    await this.clickElement(this.clickStartLink);
  }
}


module.exports = HomePage;
