import { test, expect } from '../fixtures/uiFixtures'
import { checkoutInfoFactory } from '../../utils/factories/uiFactory';

test.describe('E2E Checkout', () => {

    test('E2E-TC01: User can complete checkout successfully', async ({ loggedInPage, cartPage, checkoutPage, page }) => {

        const itemName = await loggedInPage.getFirstProductName();

        await loggedInPage.addFirstProductToCart();
        await cartPage.navigateToCart();
        await cartPage.waitForPageLoad();
        const itemNameInCart = await cartPage.getCartItemName()
        expect(itemNameInCart).toBe(itemName);

        await checkoutPage.clickCheckout();

        await expect(page).toHaveURL(/checkout-step-one/);

       const checkoutInfo = checkoutInfoFactory.create();

        await checkoutPage.fillCheckoutInfo(
            checkoutInfo.firstName,
            checkoutInfo.lastName,
            checkoutInfo.postalCode
        );

        await checkoutPage.clickContinue();

        await expect(page).toHaveURL(/checkout-step-two/);

        await checkoutPage.clickFinish();

        expect(await checkoutPage.isSuccessVisible()).toBe(true);

        await expect(page).toHaveURL(/checkout-complete/);
    });

    test('E2E-TC02: Checkout validation for required fields', async ({ loggedInPage, cartPage, checkoutPage }) => {

        await loggedInPage.addFirstProductToCart();
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