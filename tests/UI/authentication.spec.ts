import {test, expect} from '@playwright/test'
import { AuthenticationPage } from '../../pages/AuthenticationPage'

test.describe('Authentication', () =>{

    test('Auth-TC01: Standard user Authentication- happy path', async ({page}) =>{
        const authpage = new AuthenticationPage(page);
        await authpage.navigate();
        await authpage.authenticate('standard_user', 'secret_sauce');
        await expect(authpage.inventoryTitle).toBeVisible();
        await expect(page).toHaveURL(/inventory/);
    });
 
    test('Auth-TC01: Incorrect/error user Authentication- Negative scenario', async({page}) => {
        const authpage = new AuthenticationPage(page);

        await authpage.navigate();
        await authpage.authenticate('myerroruser','secret_sauce');

        await expect(authpage.errorMessage).toBeVisible();
        await expect(page).not.toHaveURL(/inventory/);
    });

    test('Auth-TC03: Locked out user Authentication- Negative scenario', async({page}) =>{
        const authPage = new AuthenticationPage(page);

        await authPage.navigate();
        await authPage.authenticate('locked_out_user', 'secret_sauce');

        await expect(authPage.errorMessage).toBeVisible();
        await expect(authPage.errorMessage).toContainText('locked out');
    });

    test('Auth-TC04: Empty username Authentication- Negative scenario', async({page}) => {
        const authPage = new AuthenticationPage(page);

        await authPage.navigate();
        await authPage.loginButton.click();

        await expect(authPage.errorMessage).toBeVisible();
        await expect(authPage.errorMessage).toContainText('Username is required');
    });

    test('Auth-TC05: Empty password Authentication', async({page}) =>{
        const authPage = new AuthenticationPage(page);

        await authPage.navigate();
        await authPage.usernameInput.fill('standard_user');
        await authPage.loginButton.click();

        await expect(authPage.errorMessage).toBeVisible();
        await expect(authPage.errorMessage).toContainText('Password is required');
    });
    test('Auth-TC06: User Logout Authentication', async({page}) => {
    const authPage = new AuthenticationPage(page);

    await authPage.navigate();
    await authPage.authenticate('standard_user', 'secret_sauce');

    await expect(authPage.inventoryTitle).toBeVisible();

    await authPage.logout();

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
    
});