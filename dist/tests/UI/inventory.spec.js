"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uiFixtures_1 = require("../fixtures/uiFixtures");
uiFixtures_1.test.describe('Inventory', () => {
    (0, uiFixtures_1.test)('INV-TC01: Inventory page loading with products', async ({ loggedInPage }) => {
        const count = await loggedInPage.getProductCount();
        (0, uiFixtures_1.expect)(count).toBeGreaterThan(0);
    });
    (0, uiFixtures_1.test)('INV-TC02: Product cards should be visible', async ({ loggedInPage }) => {
        (0, uiFixtures_1.expect)(await loggedInPage.areProductCardsVisible()).toBe(true);
    });
    (0, uiFixtures_1.test)('INV-TC03: Add to cart and remove validation', async ({ loggedInPage }) => {
        await loggedInPage.addFirstProductToCart();
        (0, uiFixtures_1.expect)(await loggedInPage.isRemoveButtonVisible()).toBe(true);
        (0, uiFixtures_1.expect)(await loggedInPage.isCartBadgeVisible()).toBe(true);
        (0, uiFixtures_1.expect)(await loggedInPage.getCartBadgeText()).toBe('1');
        await loggedInPage.removeFirstProduct();
        (0, uiFixtures_1.expect)(await loggedInPage.isCartBadgeVisible()).toBe(false);
    });
    (0, uiFixtures_1.test)('INV-TC04: Product sorting by price (low to high)', async ({ loggedInPage }) => {
        await loggedInPage.sortBy('Price (low to high)');
        const prices = await loggedInPage.getAllPrices();
        const sortedPrices = [...prices].sort((a, b) => a - b);
        (0, uiFixtures_1.expect)(prices).toEqual(sortedPrices);
    });
    (0, uiFixtures_1.test)('INV-TC05: Product sorting by name ( A-Z )', async ({ loggedInPage }) => {
        await loggedInPage.sortBy('Name (A to Z)');
        const names = await loggedInPage.getAllProductNames();
        const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
        (0, uiFixtures_1.expect)(names).toEqual(sortedNames);
    });
});
