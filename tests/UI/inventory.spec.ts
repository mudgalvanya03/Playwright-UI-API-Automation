import { test, expect } from '@playwright/test';
import { AuthenticationPage } from '../../pages/AuthenticationPage';
import { InventoryPage } from '../../pages/InventoryPage';

test.describe('Inventory', () => {
    let inventoryPage : InventoryPage;
    test.beforeEach(async ({page}) =>{
        const auth = new AuthenticationPage(page);
        await auth.navigate()
        await auth.authenticate('standard_user', 'secret_sauce');
        inventoryPage = new InventoryPage(page);
        await inventoryPage.waitForPageLoad();
        
    });

    test('INV-TC01: Inventory page loading with products', async ({ page }) => {
        const auth = new AuthenticationPage(page);
        expect(await auth.isInventoryVisible()).toBe(true);
        const productCount = await inventoryPage.getProductCount();

        expect(productCount).toBeGreaterThan(0);
    });

    test('INV-TC02: Product cards should be visible', async ({ page }) => {
        const auth = new AuthenticationPage(page);
        expect(await auth.isInventoryVisible()).toBe(true);
        expect(await inventoryPage.areProductCardsVisible()).toBe(true);
    });

    test('INV-TC03: Add to cart and remove validation', async ({ page }) => {
        const auth = new AuthenticationPage(page);
        expect(await auth.isInventoryVisible()).toBe(true);
        await inventoryPage.addFirstProductToCart();

        expect(await inventoryPage.isRemoveButtonVisible()).toBe(true);
        expect(await inventoryPage.isCartBadgeVisible()).toBe(true);
        expect(await inventoryPage.getCartBadgeText()).toBe('1');

        await inventoryPage.removeFirstProduct();

        expect(await inventoryPage.isCartBadgeVisible()).toBe(false);
    });

    test('INV-TC04: Product sorting by price (low to high)', async ({ page }) => {
        const auth = new AuthenticationPage(page);
        expect(await auth.isInventoryVisible()).toBe(true);
        await inventoryPage.sortBy('Price (low to high)');

        const prices = await inventoryPage.getAllPrices();

        const sortedPrices = [...prices].sort((a, b) => a - b);

        expect(prices).toEqual(sortedPrices);
    });

    test('INV-TC05: Product sorting by name ( A-Z )', async ({page}) =>{
        const auth = new AuthenticationPage(page);
        expect(await auth.isInventoryVisible()).toBe(true);
        await inventoryPage.sortBy('Name (A to Z)');

        const names = await inventoryPage.getAllProductNames();
        const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
        expect(names).toEqual(sortedNames);

    });
});