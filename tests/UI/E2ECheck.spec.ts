import { test, expect } from '@playwright/test';
import { AuthenticationPage } from '../../pages/AuthenticationPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage'

test.describe('E2E Checkout', () => {

  test('E2E-TC01: User can complete checkout successfully', async ({ page }) => {
    const authPage = new AuthenticationPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await authPage.navigate();
    await authPage.authenticate('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);

    const firstItem = inventoryPage.inventoryItems.first();
    await inventoryPage.addToCartButton(firstItem).click();

    await cartPage.navigateToCart();
    await expect(page).toHaveURL(/cart/);

    await checkoutPage.checkoutButton.click();
    await expect(page).toHaveURL(/checkout-step-one/);

    await checkoutPage.firstName.fill('Vanya');
    await checkoutPage.lastName.fill('Automation');
    await checkoutPage.postalCode.fill('560001');
    await checkoutPage.continueButton.click();

    await expect(page).toHaveURL(/checkout-step-two/);
    await checkoutPage.finishButton.click();

    await expect(checkoutPage.successHeader).toBeVisible();
    await expect(page).toHaveURL(/checkout-complete/);
  });

  test('E2E-TC02: Checkout validation for required fields', async ({ page }) => {
    const authPage = new AuthenticationPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Precondition: reach checkout step one 
    await authPage.navigate();
    await authPage.authenticate('standard_user', 'secret_sauce');

    await inventoryPage.addToCartButton(
        inventoryPage.inventoryItems.first()
    ).click();

    await cartPage.navigateToCart();
    await checkoutPage.checkoutButton.click();

    // array of object of scenarios
    const scenarios = [
        {
        fill: async () => {
            await checkoutPage.lastName.fill('Automation');
            await checkoutPage.postalCode.fill('560001');
        },
        error: 'First Name is required',
        },
        {
        fill: async () => {
            await checkoutPage.firstName.fill('Vanya');
            await checkoutPage.postalCode.fill('560001');
        },
        error: 'Last Name is required',
        },
        {
        fill: async () => {
            await checkoutPage.firstName.fill('Vanya');
            await checkoutPage.lastName.fill('Automation');
        },
        error: 'Postal Code is required',
        },
    ];

    for (const scenario of scenarios) {
        // Clear fields before each run
        await checkoutPage.firstName.fill('');
        await checkoutPage.lastName.fill('');
        await checkoutPage.postalCode.fill('');

        // Fill according to scenario
        await scenario.fill();

        // Attempt to continue
        await checkoutPage.continueButton.click();

        // Assert correct error
        await expect(checkoutPage.errorMessage)
        .toContainText(scenario.error);
    }
    });

});
