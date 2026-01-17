import { Page, Locator} from '@playwright/test';

export class AuthenticationPage{
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput :Locator;
    readonly loginButton : Locator;
    readonly errorMessage : Locator;
    readonly inventoryTitle: Locator;
    readonly menuButton: Locator;
    readonly logoutLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button',{name: 'Login'});
        this.errorMessage = page.getByRole('heading', {name: /Epic sadface/i,});
        this.inventoryTitle = page.getByText('Products');
        this.menuButton = page.getByRole('button', { name: 'Open Menu' });
        this.logoutLink = page.getByRole('link', { name: 'Logout' });
    }
    async navigate(){
        await this.page.goto('https://www.saucedemo.com/');
    }

    async authenticate(username: string, password: string){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async logout(){
        await this.menuButton.click();
        await this.logoutLink.click();
    }
}