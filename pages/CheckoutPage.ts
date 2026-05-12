import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  private readonly checkoutButton: Locator;
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly postalCode: Locator;
  private readonly continueButton: Locator;
  private readonly finishButton: Locator;
  private readonly successHeader: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.checkoutButton = page.getByRole('button', {
      name: 'Checkout',
    });

    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.postalCode = page.getByPlaceholder('Zip/Postal Code');

    this.continueButton = page.getByRole('button', {
      name: 'Continue',
    });

    this.finishButton = page.getByRole('button', {
      name: 'Finish',
    });

    this.successHeader = page.getByRole('heading', {
      name: /thank you for your order/i,
    });

    this.errorMessage = page.getByRole('heading', {
      name: /error/i,
    });
  }

  async waitForPageLoad(): Promise<void> {
    await this.checkoutButton.waitFor({
      state: 'visible',
      timeout: 10000,
    });
  }

  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async fillCheckoutInfo(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  async clickFinish(): Promise<void> {
    await this.finishButton.click();
  }

  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.innerText();
  }

  async isSuccessVisible(): Promise<boolean> {
    return await this.successHeader.isVisible();
  }

  async clearCheckoutFields(): Promise<void> {
    await this.firstName.fill('');
    await this.lastName.fill('');
    await this.postalCode.fill('');
  }

  async fillFirstName(firstName: string): Promise<void> {
    await this.firstName.fill(firstName);
  }

  async fillLastName(lastName: string): Promise<void> {
    await this.lastName.fill(lastName);
  }

  async fillPostalCode(postalCode: string): Promise<void> {
    await this.postalCode.fill(postalCode);
  }
}