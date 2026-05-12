import BasePage from './basepage';
class HomePage extends BasePage {
  constructor(page) {
    super(page);
  }

  get startLink() {
    return this.page.getByRole('link', { name: 'Start for Free' });
  }

  async clickStartLink() {
    await this.clickElement(this.startLink);
  }
}


module.exports = HomePage;
