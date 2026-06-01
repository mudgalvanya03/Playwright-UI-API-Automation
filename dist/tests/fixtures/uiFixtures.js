"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expect = exports.test = void 0;
const test_1 = require("@playwright/test");
const AuthenticationPage_1 = require("../../pages/AuthenticationPage");
const InventoryPage_1 = require("../../pages/InventoryPage");
const CartPage_1 = require("../../pages/CartPage");
const CheckoutPage_1 = require("../../pages/CheckoutPage");
const uiFactory_1 = require("../../utils/factories/uiFactory");
exports.test = test_1.test.extend({
    authPage: async ({ page }, use) => {
        const auth = new AuthenticationPage_1.AuthenticationPage(page);
        await use(auth);
    },
    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage_1.InventoryPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage_1.CartPage(page));
    },
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage_1.CheckoutPage(page));
    },
    loggedInPage: async ({ page }, use) => {
        // setup: navigate and login
        const auth = new AuthenticationPage_1.AuthenticationPage(page);
        await auth.navigate();
        const creds = uiFactory_1.standardUserFactory.create();
        await auth.authenticate(creds.username, creds.password);
        const inventory = new InventoryPage_1.InventoryPage(page);
        await inventory.waitForPageLoad();
        await use(inventory);
        // no teardown needed — Playwright closes page after test
    }
});
var test_2 = require("@playwright/test");
Object.defineProperty(exports, "expect", { enumerable: true, get: function () { return test_2.expect; } });
