import BasePage from "./basepage";
class signupPage extends BasePage {
    constructor(page) {
        super(page);
    }

    get accountHeading(){
        return this.page.locator("//h1[contains(text(),'Create Your Account')]");
    }

    get firstNameInput(){
        return this.page.locator("//input[contains(@name,'first_name')]");
    }

    get lastNameInput(){
        return this.page.locator("//input[contains(@name,'last_name')]");
         }
  get companyNameInput() {
        return this.page.locator("//input[contains(@placeholder,'company name')]");
    }


    get phoneNumberInput() {
        return this.page.locator("//input[contains(@placeholder,'phone number')]");
    }

    
    get countryDropdown() {
        return this.page.locator("//select[contains(@name,'country')]");
    }


    get panNumberInput() {
        return this.page.locator("//input[contains(@placeholder,'PAN number')]");
    }

  
    get emailInput() {
        return this.page.locator("//input[contains(@placeholder,'email')]");
    }


    get passwordInput() {
        return this.page.locator("//input[contains(@placeholder,'strong password')]");
    }

  
    get confirmPasswordInput() {
        return this.page.locator("//input[contains(@placeholder,'Confirm your password')]");
    }

    get createAccountBtn() {
        return this.page.locator("//button[contains(text(),'Create Account')]");
    }

    async fillFirstName(value) {
        await this.firstNameInput.fill(value);
    }

    async fillLastName(value) {
        await this.lastNameInput.fill(value);
    }

    async fillCompanyName(value) {
        await this.companyNameInput.fill(value);
    }

    async fillPhoneNumber(value) {
        await this.phoneNumberInput.fill(value);
    }

    async selectCountry(value) {
        await this.countryDropdown.selectOption(value);
    }

    async fillPanNumber(value) {
        await this.panNumberInput.fill(value);
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

    
    async fillForm(data) {
        await this.fillFirstName(data.firstName);
        await this.fillLastName(data.lastName);
        await this.fillCompanyName(data.companyName);
        await this.fillPhoneNumber(data.phoneNumber);
        await this.selectCountry(data.country);
        await this.fillPanNumber(data.panNumber);
        await this.fillEmail(data.email);
        await this.fillPassword(data.password);
        await this.fillConfirmPassword(data.confirmPassword);
        await this.clickCreateAccount();
    }
}

export default signupPage;



