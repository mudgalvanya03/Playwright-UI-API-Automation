import { test as base } from '@playwright/test'
import { AuthenticationPage } from '../../pages/AuthenticationPage'
import { InventoryPage } from '../../pages/InventoryPage'
import { CartPage } from '../../pages/CartPage'
import { CheckoutPage } from '../../pages/CheckoutPage'
import { standardUserFactory } from '../../utils/factories/uiFactory'

interface UIFixtures {
    authPage: AuthenticationPage
    inventoryPage: InventoryPage
    cartPage: CartPage
    checkoutPage: CheckoutPage
    loggedInPage: InventoryPage  // already logged in
}

export const test = base.extend<UIFixtures>({
    authPage: async ({ page }, use) => {
        const auth = new AuthenticationPage(page)
        await use(auth)
    },

    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page))
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page))
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page))
    },

    loggedInPage: async ({ page }, use) => {
        // setup: navigate and login
        const auth = new AuthenticationPage(page)
        await auth.navigate()
        const creds = standardUserFactory.create()
        await auth.authenticate(creds.username, creds.password)
        const inventory = new InventoryPage(page)
        await inventory.waitForPageLoad()
        
        await use(inventory)
        // no teardown needed — Playwright closes page after test
    }
})

export { expect } from '@playwright/test'