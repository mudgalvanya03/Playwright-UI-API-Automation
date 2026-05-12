import { test, expect } from '@playwright/test';
import { AuthenticationPage } from '../../pages/AuthenticationPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('E2E Checkout', () => {

    test('E2E-TC01: User can complete checkout successfully', async ({ page }) => {

        const authPage = new AuthenticationPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await authPage.navigate();
        await authPage.authenticate('standard_user', 'secret_sauce');

        await expect(page).toHaveURL(/inventory/);

        await inventoryPage.addFirstProductToCart();
        await cartPage.navigateToCart();

        await expect(page).toHaveURL(/cart/);

        await checkoutPage.clickCheckout();

        await expect(page).toHaveURL(/checkout-step-one/);

        await checkoutPage.fillCheckoutInfo(
            'Vanya',
            'Automation',
            '560001'
        );

        await checkoutPage.clickContinue();

        await expect(page).toHaveURL(/checkout-step-two/);

        await checkoutPage.clickFinish();

        expect(await checkoutPage.isSuccessVisible()).toBe(true);

        await expect(page).toHaveURL(/checkout-complete/);
    });

    test('E2E-TC02: Checkout validation for required fields', async ({ page }) => {

        const authPage = new AuthenticationPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await authPage.navigate();
        await authPage.authenticate('standard_user', 'secret_sauce');

        await inventoryPage.addFirstProductToCart();
        await cartPage.navigateToCart();
        await checkoutPage.clickCheckout();

        const scenarios = [
            {
                fill: async () => {
                    await checkoutPage.fillLastName('Automation');
                    await checkoutPage.fillPostalCode('560001');
                },
                error: 'First Name is required'
            },
            {
                fill: async () => {
                    await checkoutPage.fillFirstName('Vanya');
                    await checkoutPage.fillPostalCode('560001');
                },
                error: 'Last Name is required'
            },
            {
                fill: async () => {
                    await checkoutPage.fillFirstName('Vanya');
                    await checkoutPage.fillLastName('Automation');
                },
                error: 'Postal Code is required'
            }
        ];

        for (const scenario of scenarios) {

            await checkoutPage.clearCheckoutFields();

            await scenario.fill();

            await checkoutPage.clickContinue();

            expect(await checkoutPage.getErrorMessage())
                .toContain(scenario.error);
        }
    });
});