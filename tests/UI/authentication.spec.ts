import {test, expect} from '@playwright/test'
import { AuthenticationPage } from '../../pages/AuthenticationPage'

test.describe('Authentication', () =>{

    test('Auth-TC01: Standard user Authentication- happy path', async ({page}) =>{
        const authpage = new AuthenticationPage(page)
        await authpage.navigate();
        await authpage.authenticate('standard_user', 'secret_sauce');
        expect(await authpage.isInventoryVisible()).toBe(true)
        await expect(page).toHaveURL(/inventory/)
    });
 
    test('Auth-TC01: Incorrect/error user Authentication- Negative scenario', async({page}) => {
        const authpage = new AuthenticationPage(page)
        await authpage.navigate()
        await authpage.authenticate('myerroruser','secret_sauce')
        expect(await authpage.isErrorVisible()).toBe(true)
        await expect(page).not.toHaveURL(/inventory/)
    });

    test('Auth-TC03: Locked out user Authentication- Negative scenario', async({page}) =>{
        const authPage = new AuthenticationPage(page)
        await authPage.navigate()
        await authPage.authenticate('locked_out_user', 'secret_sauce')
        expect(await authPage.isErrorVisible()).toBe(true)
        expect( await authPage.getErrorMessage()).toContain('locked out')
    });

    test('Auth-TC04: Empty username Authentication- Negative scenario', async({page}) => {
        const authPage = new AuthenticationPage(page)
        await authPage.navigate()
        await authPage.loginWithoutCredential()
        expect (await authPage.isErrorVisible()).toBe(true)
        expect( await authPage.getErrorMessage()).toContain('Username is required')
    });

    test('Auth-TC05: Empty password Authentication', async({page}) =>{
        const authPage = new AuthenticationPage(page)
        await authPage.navigate()
        await authPage.fillUsername('standard_user')
        await authPage.loginWithoutCredential()
        expect (await authPage.isErrorVisible()).toBe(true)
        expect( await authPage.getErrorMessage()).toContain('Password is required')

    });

    test('Auth-TC06: User Logout Authentication', async({page}) => {
    const authPage = new AuthenticationPage(page);
    await authPage.navigate();
    await authPage.authenticate('standard_user', 'secret_sauce');
    await expect(authPage.isInventoryVisible()).toBe(true)
    await authPage.logout();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    });
    
});