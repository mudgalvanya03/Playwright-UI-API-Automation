import { test, expect } from '@playwright/test';
import { AuthenticationPage } from '../../pages/AuthenticationPage';
import { InventoryPage } from '../../pages/InventoryPage';

test.describe('Inventory', () => {

    test('INV-TC01: Inventory page loading with products', async ({ page }) => {

        const authPage = new AuthenticationPage(page);
        const inventoryPage = new InventoryPage(page);

        await authPage.navigate();
        await authPage.authenticate('standard_user', 'secret_sauce');

        expect(await authPage.isInventoryVisible()).toBe(true);

        await expect(page).toHaveURL(/inventory/);

        const productCount = await inventoryPage.getProductCount();

        expect(productCount).toBeGreaterThan(0);
    });

    test('INV-TC02: Product cards should be visible', async ({ page }) => {

        const authPage = new AuthenticationPage(page);
        const inventoryPage = new InventoryPage(page);

        await authPage.navigate();
        await authPage.authenticate('standard_user', 'secret_sauce');

        expect(await authPage.isInventoryVisible()).toBe(true);

        await expect(page).toHaveURL(/inventory/);

        expect(await inventoryPage.areProductCardsVisible()).toBe(true);
    });

    test('INV-TC03: Add to cart and remove validation', async ({ page }) => {

        const authPage = new AuthenticationPage(page);
        const inventoryPage = new InventoryPage(page);

        await authPage.navigate();
        await authPage.authenticate('standard_user', 'secret_sauce');

        expect(await authPage.isInventoryVisible()).toBe(true);

        await inventoryPage.addFirstProductToCart();

        expect(await inventoryPage.isRemoveButtonVisible()).toBe(true);
        expect(await inventoryPage.isCartBadgeVisible()).toBe(true);
        expect(await inventoryPage.getCartBadgeText()).toBe('1');

        await inventoryPage.removeFirstProduct();

        expect(await inventoryPage.isCartBadgeVisible()).toBe(false);
    });

    test('INV-TC04: Product sorting by price (low to high)', async ({ page }) => {

        const authPage = new AuthenticationPage(page);
        const inventoryPage = new InventoryPage(page);

        await authPage.navigate();
        await authPage.authenticate('standard_user', 'secret_sauce');

        await expect(page).toHaveURL(/inventory/);

        await inventoryPage.sortBy('Price (low to high)');

        const prices = await inventoryPage.getAllPrices();

        const sortedPrices = [...prices].sort((a, b) => a - b);

        expect(prices).toEqual(sortedPrices);
    });
});