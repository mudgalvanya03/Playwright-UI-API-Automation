import{Page, Locator} from '@playwright/test'

export class CartPage{
    readonly page: Page ;
    readonly cartItems: Locator;
    readonly cartItemName: Locator;
    readonly cartItemQuantity: Locator;
    readonly cartItemPrice: Locator;
    //readonly Removefromcart: Locator;
    readonly ContinueShoppingButton: Locator;

    constructor(page:Page){
        this.page = page;
        this.cartItems =page.locator('.cart_item');
        this.cartItemName = page.locator('.inventory_item_name');
        this.cartItemQuantity = page.locator('.cart_quantity');
        this.cartItemPrice = page.locator('.inventory_item_price');
        //this.Removefromcart = page.getByRole('button',{name: 'Remove'});
        this.ContinueShoppingButton = page.getByRole('button', {name:'Continue Shopping'});
    }
    async navigateToCart() {
        await this.page.locator('.shopping_cart_link').click();
    }
    removeButton(item: Locator): Locator {
    return item.getByRole('button', { name: 'Remove' });
    }



}