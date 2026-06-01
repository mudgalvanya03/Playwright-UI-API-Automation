"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const AuthenticationPage_1 = require("../../pages/AuthenticationPage");
const uiFactory_1 = require("../../utils/factories/uiFactory");
test_1.test.describe('Authentication', () => {
    (0, test_1.test)('Auth-TC01: Standard user Authentication- happy path', async ({ page }) => {
        const authpage = new AuthenticationPage_1.AuthenticationPage(page);
        await authpage.navigate();
        const creds = uiFactory_1.standardUserFactory.create();
        await authpage.authenticate(creds.username, creds.password);
        (0, test_1.expect)(await authpage.isInventoryVisible()).toBe(true);
        await (0, test_1.expect)(page).toHaveURL(/inventory/);
    });
    (0, test_1.test)('Auth-TC01: Incorrect/error user Authentication- Negative scenario', async ({ page }) => {
        const authpage = new AuthenticationPage_1.AuthenticationPage(page);
        await authpage.navigate();
        const creds = uiFactory_1.errorUserFactory.create();
        await authpage.authenticate(creds.username, creds.password);
        (0, test_1.expect)(await authpage.isErrorVisible()).toBe(true);
        await (0, test_1.expect)(page).not.toHaveURL(/inventory/);
    });
    (0, test_1.test)('Auth-TC03: Locked out user Authentication- Negative scenario', async ({ page }) => {
        const authPage = new AuthenticationPage_1.AuthenticationPage(page);
        await authPage.navigate();
        const creds = uiFactory_1.lockedUserFactory.create();
        await authPage.authenticate(creds.username, creds.password);
        (0, test_1.expect)(await authPage.isErrorVisible()).toBe(true);
        (0, test_1.expect)(await authPage.getErrorMessage()).toContain('locked out');
    });
    (0, test_1.test)('Auth-TC04: Empty username Authentication- Negative scenario', async ({ page }) => {
        const authPage = new AuthenticationPage_1.AuthenticationPage(page);
        await authPage.navigate();
        await authPage.loginWithoutCredential();
        (0, test_1.expect)(await authPage.isErrorVisible()).toBe(true);
        (0, test_1.expect)(await authPage.getErrorMessage()).toContain('Username is required');
    });
    (0, test_1.test)('Auth-TC05: Empty password Authentication', async ({ page }) => {
        const authPage = new AuthenticationPage_1.AuthenticationPage(page);
        await authPage.navigate();
        await authPage.fillUsername('standard_user');
        await authPage.loginWithoutCredential();
        (0, test_1.expect)(await authPage.isErrorVisible()).toBe(true);
        (0, test_1.expect)(await authPage.getErrorMessage()).toContain('Password is required');
    });
    (0, test_1.test)('Auth-TC06: User Logout Authentication', async ({ page }) => {
        const authPage = new AuthenticationPage_1.AuthenticationPage(page);
        await authPage.navigate();
        const creds = uiFactory_1.standardUserFactory.create();
        await authPage.authenticate(creds.username, creds.password);
        (0, test_1.expect)(await authPage.isInventoryVisible()).toBe(true);
        await authPage.logout();
        await (0, test_1.expect)(page).toHaveURL('https://www.saucedemo.com/');
    });
});
