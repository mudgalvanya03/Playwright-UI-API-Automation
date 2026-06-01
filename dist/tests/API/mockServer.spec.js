"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mock_schema_1 = require("../../schemas/api/mock.schema");
const ApiError_1 = require("../../utils/ApiError");
const validateSchema_1 = require("../../utils/validateSchema");
const apiFixtures_1 = require("../fixtures/apiFixtures");
const allure_js_commons_1 = require("allure-js-commons");
apiFixtures_1.test.describe.configure({ mode: 'serial' }); // to save from race condition
(0, apiFixtures_1.test)('MOCK-TC01: Create user then create order for that user - Complete CRUD for microservice testing', async ({ mockClient }) => {
    await (0, allure_js_commons_1.epic)('Mockserver CRUD');
    await (0, allure_js_commons_1.feature)('Create User, then Order');
    await (0, allure_js_commons_1.story)('Single user retrieval then create order');
    await (0, allure_js_commons_1.severity)('critical');
    await (0, allure_js_commons_1.tag)('API');
    await (0, allure_js_commons_1.tag)('regression');
    const requestBody = {
        name: 'Vanya Mudgal',
        job: 'SDET',
        email: 'vanya@test.com'
    };
    const createdUser = await mockClient.post('/users', requestBody);
    (0, apiFixtures_1.expect)(createdUser.id).toBeDefined();
    (0, apiFixtures_1.expect)(String(createdUser.id).length).toBeGreaterThan(0);
    (0, apiFixtures_1.expect)(createdUser.name).toBe(requestBody.name);
    (0, apiFixtures_1.expect)(createdUser.email).toBe(requestBody.email);
    (0, apiFixtures_1.expect)(createdUser.job).toBe(requestBody.job);
    const orderBody = {
        userId: createdUser.id, //! at the end signifies that 'Dont worry TS bro, I have asserted its not gonna be undefined'
        product: 'laptop',
        status: 'delivered'
    };
    const createdOrder = await mockClient.post('/orders', orderBody);
    (0, apiFixtures_1.expect)(createdOrder.id).toBeDefined();
    (0, apiFixtures_1.expect)(String(createdOrder.id).length).toBeGreaterThan(0);
    (0, apiFixtures_1.expect)(createdOrder.userId).toBe(createdUser.id);
    const fetchedOrder = await mockClient.get(`/orders/${createdOrder.id}`);
    (0, apiFixtures_1.expect)(fetchedOrder.userId).toBe(createdUser.id);
    await mockClient.delete(`/users/${createdUser.id}`);
    //await expect (mockClient.get<MockUser>(`/users/${createdUser.id}`)).rejects.toThrow(ApiError)
    try {
        await mockClient.get(`/users/${createdUser.id}`);
        throw new Error('Should have thrown ApiError');
    }
    catch (error) {
        if (error instanceof ApiError_1.ApiError) {
            (0, apiFixtures_1.expect)(error.statusCode).toBe(404);
            (0, apiFixtures_1.expect)(error.method).toBe('GET');
        }
    }
});
(0, apiFixtures_1.test)('MOCK-TC02: Get user details with schema validation', async ({ mockClient }) => {
    const rawResponse = await mockClient.get('/users/2');
    const validated = (0, validateSchema_1.validateSchema)(mock_schema_1.MockUserSchema, rawResponse);
    (0, apiFixtures_1.expect)(validated.id).toBeDefined();
    (0, apiFixtures_1.expect)(validated.email).toContain('@');
});
