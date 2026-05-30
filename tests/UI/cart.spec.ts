import { test, expect } from '../fixtures/uiFixtures'

test.describe('Cart', () => {
    
    test('CART-TC01: Cart page should show product', async ({ loggedInPage, cartPage }) => {
        
        const productName =await loggedInPage.getFirstProductName();

        await loggedInPage.addFirstProductToCart();
        await cartPage.navigateToCart();
        await cartPage.waitForPageLoad();
        expect(await cartPage.getCartItemCount()).toBe(1);
        expect(await cartPage.getCartItemName()).toBe(productName);
        expect(await cartPage.getCartItemQuantity()).toBe('1');
        expect(await cartPage.isCartItemPriceVisible()).toBe(true);
    });


    test('CART-TC02: Cart page should remove product', async ({ loggedInPage, cartPage }) => {

        await loggedInPage.addFirstProductToCart();
        await cartPage.navigateToCart();
        await cartPage.waitForPageLoad();
        await cartPage.removeFirstItem();
        expect(await loggedInPage.isCartBadgeVisible()).toBe(false);
        await cartPage.clickContinueShopping();
        await loggedInPage.waitForPageLoad();
    });
});