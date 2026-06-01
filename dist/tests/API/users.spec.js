"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = require("../../schemas/api/user.schema");
const ApiError_1 = require("../../utils/ApiError");
const patchUserFactory_1 = require("../../utils/factories/patchUserFactory");
const userFactory_1 = require("../../utils/factories/userFactory");
const validateSchema_1 = require("../../utils/validateSchema");
const apiFixtures_1 = require("../fixtures/apiFixtures");
const allure_js_commons_1 = require("allure-js-commons");
/* Commenting this boilerplate, because I have created custom fixtures
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
     }) */
(0, apiFixtures_1.test)('API-TC01: Get user details successfully ', async ({ apiClient }) => {
    await (0, allure_js_commons_1.epic)('User Management');
    await (0, allure_js_commons_1.feature)('Get User');
    await (0, allure_js_commons_1.story)('Single user retrieval');
    await (0, allure_js_commons_1.severity)('critical');
    await (0, allure_js_commons_1.tag)('API');
    await (0, allure_js_commons_1.tag)('regression');
    const response = await apiClient.get('/users/2');
    await (0, allure_js_commons_1.step)('Verify response structure', async () => {
        (0, apiFixtures_1.expect)(response.data.id).toBe(2);
        (0, apiFixtures_1.expect)(typeof response.data.id).toBe('number');
        (0, apiFixtures_1.expect)(typeof response.data.email).toContain('string');
        (0, apiFixtures_1.expect)(response.data.email).toContain('@');
        (0, apiFixtures_1.expect)(typeof response.data.first_name).toBe('string');
        (0, apiFixtures_1.expect)(typeof response.data.last_name).toBe('string');
        (0, apiFixtures_1.expect)(response.data.avatar).toContain('https');
    });
});
(0, apiFixtures_1.test)('API-TC02: Get user list', async ({ apiClient }) => {
    const response = await apiClient.get('/users?page=1');
    (0, apiFixtures_1.expect)(Array.isArray(response.data));
    (0, apiFixtures_1.expect)(response.page).toBe(1);
    (0, apiFixtures_1.expect)(typeof response.total).toBe('number');
    (0, apiFixtures_1.expect)(response.data.length).toBeGreaterThan(0);
});
(0, apiFixtures_1.test)('API-TC03: Non existent user', async ({ apiClient }) => {
    // await expect (client.get<GetUserResponse>('/users/999')).rejects.toThrow(ApiError) OR
    // try and catch block where we can access the status code and method as well
    try {
        await apiClient.get('/users/999');
        throw new Error('Should have thrown ApiError');
    }
    catch (error) {
        if (error instanceof ApiError_1.ApiError) {
            (0, apiFixtures_1.expect)(error.statusCode).toBe(404);
            (0, apiFixtures_1.expect)(error.method).toBe('GET');
        }
    }
});
(0, apiFixtures_1.test)('API-TC04: Post user', async ({ authenticatedClient }) => {
    const requestBody = userFactory_1.userFactory.create({ name: 'Vanya', job: 'SDET' });
    const response = await authenticatedClient.post('/users', requestBody);
    (0, apiFixtures_1.expect)(typeof response.id).toBe('string');
    const newID = response.id.trim();
    (0, apiFixtures_1.expect)(newID.length).toBeGreaterThan(0);
    (0, apiFixtures_1.expect)(response.name).toBe(requestBody.name);
    (0, apiFixtures_1.expect)(response.job).toBe(requestBody.job);
    (0, apiFixtures_1.expect)(new Date(response.createdAt).toString()).not.toBe('Invalid Date');
});
(0, apiFixtures_1.test)('API-TC05: Create user with empty body', async ({ authenticatedClient }) => {
    const response = await authenticatedClient.post('/users', {});
    (0, apiFixtures_1.expect)(typeof response.id).toBe('string');
    const trimmedId = response.id.trim();
    (0, apiFixtures_1.expect)(trimmedId.length).toBeGreaterThan(0);
    (0, apiFixtures_1.expect)(new Date(response.createdAt).toString()).not.toBe('Invalid Date');
    //expect(response.name).toBeUndefined()
    //expect(response.job).toBeUndefined()
});
(0, apiFixtures_1.test)('API-TC06: update user with Patch', async ({ authenticatedClient }) => {
    const requestBody = patchUserFactory_1.updateUserFactory.create({ job: 'Senior Sdet' });
    const response = await authenticatedClient.patch('/users/2', requestBody);
    (0, apiFixtures_1.expect)(typeof response.job).toBe('string');
    (0, apiFixtures_1.expect)(response.job).toBe(requestBody.job);
    (0, apiFixtures_1.expect)(typeof response.updatedAt).toBe('string');
    (0, apiFixtures_1.expect)(new Date(response.updatedAt).toString()).not.toBe('Invalid Date');
});
(0, apiFixtures_1.test)('API-TC07: Full update user with put', async ({ authenticatedClient }) => {
    const requestBody = userFactory_1.userFactory.create({ name: 'Vanya Mudgal', job: 'SDET III' });
    const response = await authenticatedClient.put('/users/2', requestBody);
    (0, apiFixtures_1.expect)(typeof response.job).toBe('string');
    (0, apiFixtures_1.expect)(response.job).toBe(requestBody.job);
    (0, apiFixtures_1.expect)(typeof response.name).toBe('string');
    (0, apiFixtures_1.expect)(response.name).toBe(requestBody.name);
    (0, apiFixtures_1.expect)(typeof response.updatedAt).toBe('string');
    (0, apiFixtures_1.expect)(new Date(response.updatedAt).toString()).not.toBe('Invalid Date');
});
(0, apiFixtures_1.test)('API-TC08: Delete user', async ({ authenticatedClient }) => {
    await authenticatedClient.delete('/users/2');
});
(0, apiFixtures_1.test)('API-TC09: Get user details with schema validation', async ({ apiClient }) => {
    const rawResponse = await apiClient.get('/users/2');
    const validated = (0, validateSchema_1.validateSchema)(user_schema_1.GetUserResponseSchema, rawResponse);
    (0, apiFixtures_1.expect)(validated.data.id).toBe(2);
    (0, apiFixtures_1.expect)(validated.data.email).toContain('@');
});
