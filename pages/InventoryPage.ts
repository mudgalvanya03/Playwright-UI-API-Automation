import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  private readonly inventoryContainer: Locator;
  private readonly inventoryItems: Locator;
  private readonly cartBadge: Locator;
  private readonly sortDropdown: Locator;

  constructor(page: Page) {
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

  async waitForPageLoad(): Promise<void> {
    await this.inventoryContainer.waitFor({
      state: 'visible',
      timeout: 10000,
    });
  }

  async getProductCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  async addFirstProductToCart(): Promise<void> {
    const firstItem = this.inventoryItems.first();

    await firstItem
      .getByRole('button', {
        name: /add to cart/i,
      })
      .click();
  }

  async removeFirstProduct(): Promise<void> {
    const firstItem = this.inventoryItems.first();

    await firstItem
      .getByRole('button', {
        name: /remove/i,
      })
      .click();
  }

  async getFirstProductName(): Promise<string> {
    return await this.inventoryItems
      .first()
      .locator('.inventory_item_name')
      .innerText();
  }

  async isRemoveButtonVisible(): Promise<boolean> {
    return await this.inventoryItems
      .first()
      .getByRole('button', {
        name: /remove/i,
      })
      .isVisible();
  }

  async isCartBadgeVisible(): Promise<boolean> {
    return await this.cartBadge.isVisible();
  }

  async getCartBadgeText(): Promise<string> {
    return await this.cartBadge.innerText();
  }

  async sortBy(option: string): Promise<void> {
    await this.sortDropdown.selectOption({
      label: option,
    });
  }

  async getAllPrices(): Promise<number[]> {
    const prices: number[] = [];

    const count =
      await this.inventoryItems.count();

    for (let i = 0; i < count; i++) {
      const priceText =
        await this.inventoryItems
          .nth(i)
          .locator('.inventory_item_price')
          .innerText();

      prices.push(
        Number(priceText.replace('$', ''))
      );
    }

    return prices;
  }

  async getAllProductNames(): Promise<string[]>{
    const names: string[] =[];

    const count= await this.inventoryItems.count();

    for(let i =0; i<count ; i++){
        const nameText= 
            await this.inventoryItems.nth(i).locator('.inventory_item_name').innerText();
        
        names.push(String(nameText));
    }
    return names;
  }

  async areProductCardsVisible(): Promise<boolean> {
    const count =
      await this.inventoryItems.count();

    for (let i = 0; i < count; i++) {
      const item =
        this.inventoryItems.nth(i);

      const isVisible =
        await item.isVisible();

      if (!isVisible) {
        return false;
      }
    }

    return true;
  }
}