import { test, expect } from '../fixtures/uiFixtures'

test.describe('Inventory', () => {

    test('INV-TC01: Inventory page loading with products', async ({ loggedInPage }) => {
        const count = await loggedInPage.getProductCount()
        expect(count).toBeGreaterThan(0)
    });

    test('INV-TC02: Product cards should be visible', async ({ loggedInPage }) => {
        expect(await loggedInPage.areProductCardsVisible()).toBe(true);
    });

    test('INV-TC03: Add to cart and remove validation', async ({ loggedInPage }) => {
        await loggedInPage.addFirstProductToCart();

        expect(await loggedInPage.isRemoveButtonVisible()).toBe(true);
        expect(await loggedInPage.isCartBadgeVisible()).toBe(true);
        expect(await loggedInPage.getCartBadgeText()).toBe('1');

        await loggedInPage.removeFirstProduct();

        expect(await loggedInPage.isCartBadgeVisible()).toBe(false);
    });

    test('INV-TC04: Product sorting by price (low to high)', async ({ loggedInPage }) => {
        await loggedInPage .sortBy('Price (low to high)');
        const prices = await loggedInPage.getAllPrices();
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).toEqual(sortedPrices);
    });

    test('INV-TC05: Product sorting by name ( A-Z )', async ({loggedInPage}) =>{
        await loggedInPage.sortBy('Name (A to Z)');

        const names = await loggedInPage.getAllProductNames();
        const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
        expect(names).toEqual(sortedNames);

    });
});