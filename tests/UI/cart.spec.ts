import { test, expect } from '@playwright/test';
import { AuthenticationPage } from '../../pages/AuthenticationPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';

test.describe('Cart', () => {
    let inventoryPage : InventoryPage;
    test.beforeEach(async ({page}) =>{
        const auth = new AuthenticationPage(page);
        await auth.navigate()
        await auth.authenticate('standard_user', 'secret_sauce');
        inventoryPage = new InventoryPage(page);
        inventoryPage.waitForPageLoad();
    });
    
    test('CART-TC01: Cart page should show product', async ({ page }) => {

        const cartPage = new CartPage(page);
        const auth = new AuthenticationPage(page);
        expect(await auth.isInventoryVisible()).toBe(true);

        const productName = await inventoryPage.getFirstProductName();

        await inventoryPage.addFirstProductToCart();
        await cartPage.navigateToCart();

        await expect(page).toHaveURL(/cart/);

        expect(await cartPage.getCartItemCount()).toBe(1);
        expect(await cartPage.getCartItemName()).toBe(productName);
        expect(await cartPage.getCartItemQuantity()).toBe('1');
        expect(await cartPage.isCartItemPriceVisible()).toBe(true);
    });

    test('CART-TC02: Cart page should remove product', async ({ page }) => {

        const cartPage = new CartPage(page);
        const auth = new AuthenticationPage(page);
        expect(await auth.isInventoryVisible()).toBe(true);

        await inventoryPage.addFirstProductToCart();
        await cartPage.navigateToCart();

        await expect(page).toHaveURL(/cart/);

        await cartPage.removeFirstItem();

        expect(await inventoryPage.isCartBadgeVisible()).toBe(false);

        await cartPage.clickContinueShopping();

        await expect(page).toHaveURL(/inventory/);
    });
});