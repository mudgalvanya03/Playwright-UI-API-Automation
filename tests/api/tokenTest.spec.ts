import test, { expect } from "@playwright/test"
import { ConfigLoader } from "../../config/loader"
import { ApiClient } from "../../utils/ApiClient"
import { AuthManager } from "../../utils/AuthManager"

test('AuthManager reuses token on second call', async ({ request }) => {
    
  const config = ConfigLoader.load()
  const client = new ApiClient(request, config.ApiURL)
  const auth = new AuthManager(client, {
    email: 'eve.holt@reqres.in',
    password: 'cityslicka'
 }, config.reqresApiKey)  

  const token1 = await auth.getToken()
  const token2 = await auth.getToken()


  expect(token1).toBe(token2)
})