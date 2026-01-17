import{test, expect} from '@playwright/test'
import { AuthenticationPage } from '../../pages/AuthenticationPage'
import { InventoryPage } from '../../pages/InventoryPage'

test.describe('Inventory', () =>{
    
    test('INV-TC01: Inventory page loading with products', async ({page}) => {
        const authpage = new AuthenticationPage(page);
        const inventorypage = new InventoryPage(page);

        await authpage.navigate();
        await authpage.authenticate('standard_user', 'secret_sauce');
        await expect(authpage.inventoryTitle).toBeVisible();
        await expect(page).toHaveURL(/inventory/);
        
        const productcount = await inventorypage.getProductCount();
        expect(productcount).toBeGreaterThan(0);
    }); 

        test('INV-TC02: Product cards should be visible' , async({page}) =>{
            const authpage = new AuthenticationPage(page);
            const inventorypage = new InventoryPage(page);

            await authpage.navigate();
            await authpage.authenticate('standard_user', 'secret_sauce');
            await expect(authpage.inventoryTitle).toBeVisible();
            await expect(page).toHaveURL(/inventory/);

            const items= inventorypage.inventoryItems;
            const count = await items.count();
            expect(count).toBeGreaterThan(0);

            for(let i =0 ; i < count ; i++){
                const item = items.nth(i);
                await expect(inventorypage.productName(item)).toBeVisible();
                await expect(inventorypage.productPrice(item)).toBeVisible();
                await expect(inventorypage.productPrice(item)).toContainText('$');
                await expect(inventorypage.addToCartButton(item)).toBeVisible();
            }
        }); 

        test('INV- TC03: Add to cart and remove validation', async({page}) =>{
            //here we will validate 3 things- Changes button to Remove, Shows cart badge, Cart badge count = 1
            const authpage = new AuthenticationPage(page);
            const inventorypage = new InventoryPage(page);

            await authpage.navigate();
            await authpage.authenticate('standard_user' , 'secret_sauce');
            await expect(authpage.inventoryTitle).toBeVisible();
            await expect(page).toHaveURL(/inventory/);

            const firstitem = inventorypage.inventoryItems.first();
            await inventorypage.addToCartButton(firstitem).click();
            await expect(inventorypage.RemoveButton(firstitem)).toBeVisible();

            await expect(inventorypage.cartBadge).toBeVisible();
            await expect(inventorypage.cartBadge).toHaveText('1');

            //Remove button validation
            await inventorypage.RemoveButton(firstitem).click();
            await expect(inventorypage.cartBadge).not.toBeVisible();
            await expect(inventorypage.addToCartButton(firstitem)).toBeVisible();
        }); 

        test('INV -TC04: Product sorting by price (low to high)' , async({page}) =>{
            const authpage = new AuthenticationPage(page);
            const inventorypage = new InventoryPage(page);                        
            await authpage.navigate();
            await authpage.authenticate('standard_user', 'secret_sauce');

            await expect(page).toHaveURL(/inventory/);

            
            await inventorypage.sortby('Price (low to high)');
            
            const prices = await inventorypage.getallPrices();
            
            const sortedPrices = [...prices].sort((a, b) => a - b);
            expect(prices).toEqual(sortedPrices);
        });



});