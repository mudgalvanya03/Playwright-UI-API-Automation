import{test, expect} from '@playwright/test'
import { AuthenticationPage } from '../../pages/AuthenticationPage'
import { InventoryPage } from '../../pages/InventoryPage'
import { CartPage } from '../../pages/CartPage'

test.describe( 'Cart' , () =>{
    
    test('CART -TC01: Cart Pagae should show product', async({page}) =>{
    const authPage = new AuthenticationPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await authPage.navigate();
    await authPage.authenticate('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);

    const firstItem = inventoryPage.inventoryItems.first();
    const Productname = await firstItem.locator('.inventory_item_name').innerText();

    await inventoryPage.addToCartButton(firstItem).click();
    await cartPage.navigateToCart();
    await expect(page).toHaveURL(/cart/);

    await expect(cartPage.cartItems).toHaveCount(1);
    await expect(cartPage.cartItemName).toHaveText(Productname);
    await expect(cartPage.cartItemQuantity).toHaveText('1');
    await expect(cartPage.cartItemPrice).toBeVisible();

    }); 

    test('CART -TC02: Cart Pagae should remove product', async({page}) =>{
    const authPage = new AuthenticationPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await authPage.navigate();
    await authPage.authenticate('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);

    const firstItem = inventoryPage.inventoryItems.first();
    await inventoryPage.addToCartButton(firstItem).click();
    await cartPage.navigateToCart();
    await expect(page).toHaveURL(/cart/);

    const cartItem = cartPage.cartItems.first();
    await cartPage.removeButton(cartItem).click();

    await expect(inventoryPage.cartBadge).not.toBeVisible();
    await cartPage.ContinueShoppingButton.click();
    await expect(page).toHaveURL(/inventory/);    
    });

});