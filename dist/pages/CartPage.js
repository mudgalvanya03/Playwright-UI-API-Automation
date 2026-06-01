"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartPage = void 0;
const BasePage_1 = require("./BasePage");
class CartPage extends BasePage_1.BasePage {
    cartItems;
    cartItemName;
    cartItemQuantity;
    cartItemPrice;
    continueShoppingButton;
    constructor(page) {
        super(page);
        this.cartItems = page.locator('.cart_item');
        this.cartItemName = page.locator('.inventory_item_name');
        this.cartItemQuantity = page.locator('.cart_quantity');
        this.cartItemPrice = page.locator('.inventory_item_price');
        this.continueShoppingButton = page.getByRole('button', {
            name: 'Continue Shopping',
        });
    }
    async waitForPageLoad() {
        await this.cartItems.first().waitFor({
            state: 'visible',
            timeout: 10000,
        });
    }
    async navigateToCart() {
        await this.page.locator('.shopping_cart_link').click();
    }
    async getCartItemCount() {
        return await this.cartItems.count();
    }
    async getCartItemName() {
        return await this.cartItemName.first().innerText();
    }
    async getCartItemQuantity() {
        return await this.cartItemQuantity.first().innerText();
    }
    async isCartItemPriceVisible() {
        return await this.cartItemPrice.first().isVisible();
    }
    async removeFirstItem() {
        await this.cartItems
            .first()
            .getByRole('button', { name: 'Remove' })
            .click();
    }
    async clickContinueShopping() {
        await this.continueShoppingButton.click();
    }
}
exports.CartPage = CartPage;
