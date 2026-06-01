"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutPage = void 0;
const BasePage_1 = require("./BasePage");
class CheckoutPage extends BasePage_1.BasePage {
    checkoutButton;
    firstName;
    lastName;
    postalCode;
    continueButton;
    finishButton;
    successHeader;
    errorMessage;
    constructor(page) {
        super(page);
        this.checkoutButton = page.getByRole('button', {
            name: 'Checkout',
        });
        this.firstName = page.getByPlaceholder('First Name');
        this.lastName = page.getByPlaceholder('Last Name');
        this.postalCode = page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.getByRole('button', {
            name: 'Continue',
        });
        this.finishButton = page.getByRole('button', {
            name: 'Finish',
        });
        this.successHeader = page.getByRole('heading', {
            name: /thank you for your order/i,
        });
        this.errorMessage = page.getByRole('heading', {
            name: /error/i,
        });
    }
    async waitForPageLoad() {
        await this.checkoutButton.waitFor({
            state: 'visible',
            timeout: 10000,
        });
    }
    async clickCheckout() {
        await this.checkoutButton.click();
    }
    async fillCheckoutInfo(firstName, lastName, postalCode) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
    }
    async clickContinue() {
        await this.continueButton.click();
    }
    async clickFinish() {
        await this.finishButton.click();
    }
    async getErrorMessage() {
        return await this.errorMessage.innerText();
    }
    async isSuccessVisible() {
        return await this.successHeader.isVisible();
    }
    async clearCheckoutFields() {
        await this.firstName.fill('');
        await this.lastName.fill('');
        await this.postalCode.fill('');
    }
    async fillFirstName(firstName) {
        await this.firstName.fill(firstName);
    }
    async fillLastName(lastName) {
        await this.lastName.fill(lastName);
    }
    async fillPostalCode(postalCode) {
        await this.postalCode.fill(postalCode);
    }
}
exports.CheckoutPage = CheckoutPage;
