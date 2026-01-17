import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly successHeader: Locator;
  readonly errorMessage: Locator;


  constructor(page: Page) {
    this.page = page;

    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });

    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.postalCode = page.getByPlaceholder('Zip/Postal Code');

    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.finishButton = page.getByRole('button', { name: 'Finish' });

    this.successHeader = page.getByRole('heading', {
      name: /thank you for your order/i,});
    this.errorMessage = page.getByRole('heading', { name: /error/i });
  }
}
