import{Page, Locator} from '@playwright/test'

export class InventoryPage{
    readonly page: Page;
    readonly inventoryContainer: Locator;
    readonly inventoryItems: Locator;
    readonly cartBadge: Locator;
    readonly sortdropdown: Locator;

    constructor(page: Page){
        this.page = page;
        this.inventoryContainer = page.locator('#inventory_container');
        this.inventoryItems = this.inventoryContainer.locator('.inventory_item');
        //this.cartBadge = page.getByTestId('shopping-cart-link'); not working
        this.cartBadge = page.locator('.shopping_cart_badge');
       this.sortdropdown = page.locator('[data-test="product-sort-container"]');
    }
     productName(item: Locator): Locator {
    return item.locator('.inventory_item_name');
  }

  productPrice(item: Locator): Locator {
    return item.locator('.inventory_item_price');
  }

  addToCartButton(item: Locator): Locator {
    return item.getByRole('button', { name: /add to cart/i });
  }
    async getProductCount() : Promise<number>{
        return await this.inventoryItems.count();
    }
    RemoveButton(item: Locator): Locator {
        return item.getByRole('button', { name: /remove/i});
    }
    async sortby(option: string){
        await this.sortdropdown.selectOption({label : option});
    }
    async getallPrices(): Promise<number[]>{
        const prices: number[] = [];
        const count = await this.inventoryItems.count();

        for (let i = 0; i < count; i++) {
        const priceText = await this.productPrice(
            this.inventoryItems.nth(i)
        ).innerText();

        prices.push(Number(priceText.replace('$', '')));
        }
        return prices;
    }
}