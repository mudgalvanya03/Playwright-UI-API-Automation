import { test, expect } from '@playwright/test';
import { AuthenticationPage } from '../../pages/AuthenticationPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';

test.describe('Cart', () => {

    test('CART-TC01: Cart page should show product', async ({ page }) => {

        const authPage = new AuthenticationPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        await authPage.navigate();
        await authPage.authenticate('standard_user', 'secret_sauce');

        await expect(page).toHaveURL(/inventory/);

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

        const authPage = new AuthenticationPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        await authPage.navigate();
        await authPage.authenticate('standard_user', 'secret_sauce');

        await expect(page).toHaveURL(/inventory/);

        await inventoryPage.addFirstProductToCart();
        await cartPage.navigateToCart();

        await expect(page).toHaveURL(/cart/);

        await cartPage.removeFirstItem();

        expect(await inventoryPage.isCartBadgeVisible()).toBe(false);

        await cartPage.clickContinueShopping();

        await expect(page).toHaveURL(/inventory/);
    });
});