"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uiFixtures_1 = require("../fixtures/uiFixtures");
const uiFactory_1 = require("../../utils/factories/uiFactory");
uiFixtures_1.test.describe('E2E Checkout', () => {
    (0, uiFixtures_1.test)('E2E-TC01: User can complete checkout successfully', async ({ loggedInPage, cartPage, checkoutPage, page }) => {
        const itemName = await loggedInPage.getFirstProductName();
        await loggedInPage.addFirstProductToCart();
        await cartPage.navigateToCart();
        await cartPage.waitForPageLoad();
        const itemNameInCart = await cartPage.getCartItemName();
        (0, uiFixtures_1.expect)(itemNameInCart).toBe(itemName);
        await checkoutPage.clickCheckout();
        await (0, uiFixtures_1.expect)(page).toHaveURL(/checkout-step-one/);
        const checkoutInfo = uiFactory_1.checkoutInfoFactory.create();
        await checkoutPage.fillCheckoutInfo(checkoutInfo.firstName, checkoutInfo.lastName, checkoutInfo.postalCode);
        await checkoutPage.clickContinue();
        await (0, uiFixtures_1.expect)(page).toHaveURL(/checkout-step-two/);
        await checkoutPage.clickFinish();
        (0, uiFixtures_1.expect)(await checkoutPage.isSuccessVisible()).toBe(true);
        await (0, uiFixtures_1.expect)(page).toHaveURL(/checkout-complete/);
    });
    (0, uiFixtures_1.test)('E2E-TC02: Checkout validation for required fields', async ({ loggedInPage, cartPage, checkoutPage }) => {
        await loggedInPage.addFirstProductToCart();
        await cartPage.navigateToCart();
        await checkoutPage.clickCheckout();
        const scenarios = [
            {
                fill: async () => {
                    await checkoutPage.fillLastName('Automation');
                    await checkoutPage.fillPostalCode('560001');
                },
                error: 'First Name is required'
            },
            {
                fill: async () => {
                    await checkoutPage.fillFirstName('Vanya');
                    await checkoutPage.fillPostalCode('560001');
                },
                error: 'Last Name is required'
            },
            {
                fill: async () => {
                    await checkoutPage.fillFirstName('Vanya');
                    await checkoutPage.fillLastName('Automation');
                },
                error: 'Postal Code is required'
            }
        ];
        for (const scenario of scenarios) {
            await checkoutPage.clearCheckoutFields();
            await scenario.fill();
            await checkoutPage.clickContinue();
            (0, uiFixtures_1.expect)(await checkoutPage.getErrorMessage())
                .toContain(scenario.error);
        }
    });
});
