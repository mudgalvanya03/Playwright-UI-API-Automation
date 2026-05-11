import { LoginPage } from "../../pages/LoginPage";
import { test, expect } from '@playwright/test'

test('should login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.NavigateTo('https://www.saucedemo.com')
  await loginPage.WaitForPageLoad()
  await loginPage.Login('standard_user', 'secret_sauce')
  await expect(page).toHaveURL(/inventory/)
})