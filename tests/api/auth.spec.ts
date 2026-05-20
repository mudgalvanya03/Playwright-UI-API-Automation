import { test, expect, request as playwrightRequest, APIRequestContext } from '@playwright/test'
import { ApiClient } from '../../utils/ApiClient'
import { ConfigLoader } from '../../config/loader'
import { ApiError } from '../../utils/ApiError'
import { LoginRequest, LoginResponse} from '../../types/api/auth.types'
import { AuthManager } from '../../utils/AuthManager'

test.describe('Users API', ()=>{
    let client : ApiClient
    let authManager : AuthManager
    let apiContext: APIRequestContext

    test.beforeAll(async () => {
        apiContext = await playwrightRequest.newContext()
        const config = ConfigLoader.load()
        const baseClient = new ApiClient(apiContext, config.ApiURL)
        authManager = new AuthManager(baseClient, {
            email: 'eve.holt@reqres.in',
            password: 'cityslicka'
        }, config.reqresApiKey)

        client = new ApiClient(
            apiContext,
            config.ApiURL,
            undefined,
            undefined,
            { 'x-api-key': config.reqresApiKey })
    })

    test.afterAll(async () => {
        // dispose it yourself when done
         await apiContext.dispose()
     })

    test('AUTH-TC01: Valid login returns token', async () => {

        const requestBody: LoginRequest = {
            email: 'eve.holt@reqres.in',
            password: 'cityslicka'
        }

        const response =
            await client.post<
                LoginResponse,
                LoginRequest
            >('/login', requestBody)

        expect(typeof response.token)
            .toBe('string')

        const trimmedToken =
            response.token.trim()

        expect(trimmedToken.length)
            .toBeGreaterThan(0)
    })

    test('AUTH-TC02: Invalid credentials throws error', async () => {

        const requestBody: LoginRequest = {
            email: 'wrong@email.com',
            password: 'wrongpassword'
        }

        try {

            await client.post<
                LoginResponse,
                LoginRequest
            >('/login', requestBody)

            throw new Error(
                'Should have thrown ApiError'
            )

        } catch (error: unknown) {

            if (error instanceof ApiError) {
                expect(error.statusCode)
                    .toBe(400)

                expect(error.method)
                    .toBe('POST')
            }
        }
    })

    test('AUTH-TC03: Missing password throws error', async () => {

        const requestBody = {
            email: 'eve.holt@reqres.in'
        }

        try {

            await client.post<
                LoginResponse,
                Partial<LoginRequest>
            >('/login', requestBody)

            throw new Error(
                'Should have thrown ApiError'
            )

        } catch (error: unknown) {

            if (error instanceof ApiError) {
                expect(error.statusCode)
                    .toBe(400)

                expect(error.method)
                    .toBe('POST')
            }
        }
    })
})