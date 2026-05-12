import BasePage from "./basepage";
class signupPage extends BasePage {
    constructor(page) {
        super(page);
    }

    get companyNameInput() {
        return this.page.locator("//input[contains(@placeholder,'company name')]");
    }

    get emailInput() {
        return this.page.locator("//input[contains(@name,'email')]");
    }

    get passwordInput() {
        return this.page.locator("//input[contains(@name,'password')]");
    }

    get confirmPasswordInput() {
        return this.page.locator("//input[contains(@name,'confirmPassword')]");
    }

    get workspaceInput() {
        return this.page.locator("//input[contains(@placeholder,'my-workspace')]");
    }

    get countrySearchInput() {
        return this.page.locator("//input[contains(@Placeholder,'Search country')]");
    }

    get nepalOption() {
        return this.page.locator("//div[contains(text(),'Nepal')] | //span[contains(text(),'Nepal')] | //li[contains(text(),'Nepal')]");
    }

    get contactNumberInput() {
        return this.page.locator("//input[contains(@type,'tel')]");
    }

    get termsCheckbox() {
        return this.page.locator("//input[contains(@id,'terms')]");
    }

    get accountHeading() {
        return this.page.locator("//h1[contains(text(),'Create Account')] | //h2[contains(text(),'Create Account')] | //div[contains(text(),'Create Account')]");
    }

    get createAccountBtn() {
        return this.page.locator("//button[contains(@type ,'submit')]");
    }

    async fillCompanyName(value) {
        await this.companyNameInput.fill(value);
    }

    async fillEmail(value) {
        await this.emailInput.fill(value);
    }

    async fillPassword(value) {
        await this.passwordInput.fill(value);
    }

    async fillConfirmPassword(value) {
        await this.confirmPasswordInput.fill(value);
    }

    async clickCreateAccount() {
        await this.createAccountBtn.click();
    }

    async waitForWorkspaceAutoFill() {
        await this.workspaceInput.waitFor({ state: 'visible' });
    }

    async selectNepal() {
        await this.countrySearchInput.fill('Nepal');
        await this.nepalOption.click();
    }

    async fillContactNumber() {
        await this.contactNumberInput.fill('9819384203');
    }

    async checkTermsCheckbox() {
        await this.termsCheckbox.check();
    }

    async fillForm(data) {
        await this.fillCompanyName(data.companyName);
        await this.fillEmail(data.email);
        await this.fillPassword(data.password);
        await this.fillConfirmPassword(data.password);
        await this.clickCreateAccount();
    }
}

export default signupPage;



