"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationPage = void 0;
const BasePage_1 = require("./BasePage");
class AuthenticationPage extends BasePage_1.BasePage {
    usernameInput;
    passwordInput;
    loginButton;
    errorMessage;
    inventoryTitle;
    menuButton;
    logoutLink;
    constructor(page) {
        //this.page = page;
        super(page);
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.getByRole('heading', { name: /Epic sadface/i, });
        this.inventoryTitle = page.getByText('Products');
        this.menuButton = page.getByRole('button', { name: 'Open Menu' });
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
    }
    async waitForPageLoad() {
        await this.usernameInput.waitFor({ state: 'visible', timeout: 10000 });
    }
    async navigate() {
        await this.page.goto('/');
    }
    async authenticate(username, password) {
        this.logger.info(`Logging in as: ${username}`);
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
    async loginWithoutCredential() {
        await this.loginButton.click();
    }
    async fillUsername(username) {
        await this.usernameInput.fill(username);
    }
    async logout() {
        await this.menuButton.click();
        await this.logoutLink.click();
    }
    async getErrorMessage() {
        return await this.errorMessage.innerText();
    }
    async isErrorVisible() {
        return await this.errorMessage.isVisible();
    }
    async isInventoryVisible() {
        return await this.inventoryTitle.isVisible();
    }
}
exports.AuthenticationPage = AuthenticationPage;
