/* THIS PAGE OBJECT MODEL WAS ONLY USED FOR VALIDATING THE ABSTRACT CLASS, METHOD AND LEARN HOW TO USE THEM.

import { Locator } from "@playwright/test";
import { BasePage } from "./BasePage";
import { Page } from '@playwright/test';

export class LoginPage extends BasePage{
    //protected readonly page:Page;
    private readonly usernameInput: Locator;
    private readonly passwordInput :Locator;
    private readonly loginButton : Locator;
    private readonly errorMessage : Locator;
    
    constructor(page:Page){
        super(page);
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button',{name: 'Login'});
        this.errorMessage = page.getByRole('heading', {name: /Epic sadface/i,});        
    }

    async Login(username: string, password: string): Promise<void>{
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }    

    async GetErrorMessage(): Promise<string>{
        return await this.errorMessage.innerText();
    }

    async waitForPageLoad(): Promise<void> {
        await this.usernameInput.waitFor({ state: 'visible', timeout: 10000 })
    }
}
    */