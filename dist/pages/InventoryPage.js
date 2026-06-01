"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryPage = void 0;
const BasePage_1 = require("./BasePage");
class InventoryPage extends BasePage_1.BasePage {
    inventoryContainer;
    inventoryItems;
    cartBadge;
    sortDropdown;
    constructor(page) {
        super(page);
        this.inventoryContainer =
            page.locator('[data-test="inventory-container"]');
        this.inventoryItems =
            this.inventoryContainer.locator('.inventory_item');
        this.cartBadge =
            page.locator('.shopping_cart_badge');
        this.sortDropdown =
            page.locator('[data-test="product-sort-container"]');
    }
    async waitForPageLoad() {
        await this.inventoryContainer.waitFor({
            state: 'visible',
            timeout: 10000,
        });
    }
    async getProductCount() {
        return await this.inventoryItems.count();
    }
    async addFirstProductToCart() {
        const firstItem = this.inventoryItems.first();
        await firstItem
            .getByRole('button', {
            name: /add to cart/i,
        })
            .click();
    }
    async removeFirstProduct() {
        const firstItem = this.inventoryItems.first();
        await firstItem
            .getByRole('button', {
            name: /remove/i,
        })
            .click();
    }
    async getFirstProductName() {
        return await this.inventoryItems
            .first()
            .locator('.inventory_item_name')
            .innerText();
    }
    async isRemoveButtonVisible() {
        return await this.inventoryItems
            .first()
            .getByRole('button', {
            name: /remove/i,
        })
            .isVisible();
    }
    async isCartBadgeVisible() {
        return await this.cartBadge.isVisible();
    }
    async getCartBadgeText() {
        return await this.cartBadge.innerText();
    }
    async sortBy(option) {
        await this.sortDropdown.selectOption({
            label: option,
        });
    }
    async getAllPrices() {
        const prices = [];
        const count = await this.inventoryItems.count();
        for (let i = 0; i < count; i++) {
            const priceText = await this.inventoryItems
                .nth(i)
                .locator('.inventory_item_price')
                .innerText();
            prices.push(Number(priceText.replace('$', '')));
        }
        return prices;
    }
    async getAllProductNames() {
        const names = [];
        const count = await this.inventoryItems.count();
        for (let i = 0; i < count; i++) {
            const nameText = await this.inventoryItems.nth(i).locator('.inventory_item_name').innerText();
            names.push(String(nameText));
        }
        return names;
    }
    async areProductCardsVisible() {
        const count = await this.inventoryItems.count();
        for (let i = 0; i < count; i++) {
            const item = this.inventoryItems.nth(i);
            const isVisible = await item.isVisible();
            if (!isVisible) {
                return false;
            }
        }
        return true;
    }
}
exports.InventoryPage = InventoryPage;
