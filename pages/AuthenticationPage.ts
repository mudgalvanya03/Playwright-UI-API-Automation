import { Page, Locator} from '@playwright/test';
import { BasePage } from './BasePage';

export class AuthenticationPage extends BasePage{
    private readonly usernameInput: Locator
    private readonly passwordInput: Locator
    private readonly loginButton: Locator
    private readonly errorMessage: Locator
    private readonly inventoryTitle: Locator
    private readonly menuButton: Locator
    private readonly logoutLink: Locator


    constructor(page: Page) {
        //this.page = page;
        super(page);
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button',{name: 'Login'});
        this.errorMessage = page.getByRole('heading', {name: /Epic sadface/i,});
        this.inventoryTitle = page.getByText('Products');
        this.menuButton = page.getByRole('button', { name: 'Open Menu' });
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
    }

    async waitForPageLoad(): Promise<void> {
        await this.usernameInput.waitFor({state:'visible', timeout: 10000})
    }

    async navigate(): Promise<void>{
        await this.page.goto('https://www.saucedemo.com/');
    }

    async authenticate(username: string, password: string): Promise<void>{
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async loginWithoutCredential(): Promise<void>{
        await this.loginButton.click();
    }
    
    async fillUsername(username: string): Promise<void> {
        await this.usernameInput.fill(username)
    }
    async logout(): Promise<void>{
        await this.menuButton.click();
        await this.logoutLink.click();
    }

    async getErrorMessage(): Promise<string>{
        return await this.errorMessage.innerText()
    }

    async isErrorVisible(): Promise<boolean>{
        return await this.errorMessage.isVisible()
    }

    async isInventoryVisible(): Promise<boolean>{
        return await this.inventoryTitle.isVisible()
    }
}