import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private readonly cartItems: Locator;
  private readonly cartItemName: Locator;
  private readonly cartItemQuantity: Locator;
  private readonly cartItemPrice: Locator;
  private readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    super(page);

    this.cartItems = page.locator('.cart_item');
    this.cartItemName = page.locator('.inventory_item_name');
    this.cartItemQuantity = page.locator('.cart_quantity');
    this.cartItemPrice = page.locator('.inventory_item_price');

    this.continueShoppingButton = page.getByRole('button', {
      name: 'Continue Shopping',
    });
  }

  async waitForPageLoad(): Promise<void> {
    await this.cartItems.first().waitFor({
      state: 'visible',
      timeout: 10000,
    });
  }

  async navigateToCart(): Promise<void> {
    await this.page.locator('.shopping_cart_link').click();
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async getCartItemName(): Promise<string> {
    return await this.cartItemName.first().innerText();
  }

  async getCartItemQuantity(): Promise<string> {
    return await this.cartItemQuantity.first().innerText();
  }

  async isCartItemPriceVisible(): Promise<boolean> {
    return await this.cartItemPrice.first().isVisible();
  }

  async removeFirstItem(): Promise<void> {
    await this.cartItems
      .first()
      .getByRole('button', { name: 'Remove' })
      .click();
  }

  async clickContinueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }
}