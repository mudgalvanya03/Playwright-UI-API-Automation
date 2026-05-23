import { test as base, request as playwrightRequest } from '@playwright/test'
import { ApiClient } from '../../utils/ApiClient'
import { AuthManager } from '../../utils/AuthManager'
import { ConfigLoader } from '../../config/loader'

interface ApiFixtures {
  apiClient: ApiClient
  authenticatedClient: ApiClient
}

export const test = base.extend<ApiFixtures>({
    
  apiClient: async ({}, use) => {
    const apiContext = await playwrightRequest.newContext()
    const config = ConfigLoader.load()
    const client = new ApiClient(
        apiContext,
        config.ApiURL,
        undefined,
         undefined,
        { 'x-api-key': config.reqresApiKey })    
    await use(client)
    await apiContext.dispose()
  },

  authenticatedClient: async ({}, use) => {
    const apiContext = await playwrightRequest.newContext()
    const config = ConfigLoader.load()
    const baseClient = new ApiClient(apiContext, config.ApiURL)
    const authManager = new AuthManager(baseClient, {
        email: 'eve.holt@reqres.in',
         password: 'cityslicka'
    }, config.reqresApiKey)

    const client = new ApiClient(
        apiContext,
        config.ApiURL,
        authManager,
         undefined,
        { 'x-api-key': config.reqresApiKey })
    await use(client)
    await apiContext.dispose()    
  }

})

export { expect } from '@playwright/test'