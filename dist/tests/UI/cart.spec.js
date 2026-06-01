"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uiFixtures_1 = require("../fixtures/uiFixtures");
uiFixtures_1.test.describe('Cart', () => {
    (0, uiFixtures_1.test)('CART-TC01: Cart page should show product', async ({ loggedInPage, cartPage }) => {
        const productName = await loggedInPage.getFirstProductName();
        await loggedInPage.addFirstProductToCart();
        await cartPage.navigateToCart();
        await cartPage.waitForPageLoad();
        (0, uiFixtures_1.expect)(await cartPage.getCartItemCount()).toBe(1);
        (0, uiFixtures_1.expect)(await cartPage.getCartItemName()).toBe(productName);
        (0, uiFixtures_1.expect)(await cartPage.getCartItemQuantity()).toBe('1');
        (0, uiFixtures_1.expect)(await cartPage.isCartItemPriceVisible()).toBe(true);
    });
    (0, uiFixtures_1.test)('CART-TC02: Cart page should remove product', async ({ loggedInPage, cartPage }) => {
        await loggedInPage.addFirstProductToCart();
        await cartPage.navigateToCart();
        await cartPage.waitForPageLoad();
        await cartPage.removeFirstItem();
        (0, uiFixtures_1.expect)(await loggedInPage.isCartBadgeVisible()).toBe(false);
        await cartPage.clickContinueShopping();
        await loggedInPage.waitForPageLoad();
    });
});
