"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const ApiClient_1 = require("../../utils/ApiClient");
const loader_1 = require("../../config/loader");
const ApiError_1 = require("../../utils/ApiError");
const loginFactory_1 = require("../../utils/factories/loginFactory");
const allure_js_commons_1 = require("allure-js-commons");
test_1.test.describe('Auth API', () => {
    let client;
    //let authManager : AuthManager
    let apiContext;
    test_1.test.beforeAll(async () => {
        apiContext = await test_1.request.newContext();
        const config = loader_1.ConfigLoader.load();
        client = new ApiClient_1.ApiClient(apiContext, config.ApiURL, undefined, undefined, { 'x-api-key': config.reqresApiKey });
    });
    test_1.test.afterAll(async () => {
        // dispose it yourself when done
        await apiContext.dispose();
    });
    (0, test_1.test)('AUTH-TC01: Valid login returns token', async () => {
        await (0, allure_js_commons_1.epic)('Auth Login');
        await (0, allure_js_commons_1.feature)('Auth Login');
        await (0, allure_js_commons_1.story)('Valid login returns token');
        await (0, allure_js_commons_1.severity)('critical');
        await (0, allure_js_commons_1.tag)('API');
        await (0, allure_js_commons_1.tag)('regression');
        const requestBody = loginFactory_1.loginFactory.create();
        const response = await client.post('/login', requestBody);
        (0, test_1.expect)(typeof response.token)
            .toBe('string');
        const trimmedToken = response.token.trim();
        (0, test_1.expect)(trimmedToken.length)
            .toBeGreaterThan(0);
    });
    (0, test_1.test)('AUTH-TC02: Invalid credentials throws error', async () => {
        const requestBody = loginFactory_1.loginFactory.create({
            email: 'wrong@email.com',
            password: 'wrongpassword'
        });
        try {
            await client.post('/login', requestBody);
            throw new Error('Should have thrown ApiError');
        }
        catch (error) {
            if (error instanceof ApiError_1.ApiError) {
                (0, test_1.expect)(error.statusCode)
                    .toBe(400);
                (0, test_1.expect)(error.method)
                    .toBe('POST');
            }
        }
    });
    (0, test_1.test)('AUTH-TC03: Missing password throws error', async () => {
        const requestBody = {
            email: 'eve.holt@reqres.in'
        };
        try {
            await client.post('/login', requestBody);
            throw new Error('Should have thrown ApiError');
        }
        catch (error) {
            if (error instanceof ApiError_1.ApiError) {
                (0, test_1.expect)(error.statusCode)
                    .toBe(400);
                (0, test_1.expect)(error.method)
                    .toBe('POST');
            }
        }
    });
});
