"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expect = exports.test = void 0;
const test_1 = require("@playwright/test");
const ApiClient_1 = require("../../utils/ApiClient");
const AuthManager_1 = require("../../utils/AuthManager");
const loader_1 = require("../../config/loader");
exports.test = test_1.test.extend({
    apiClient: async ({}, use) => {
        const apiContext = await test_1.request.newContext();
        const config = loader_1.ConfigLoader.load();
        const client = new ApiClient_1.ApiClient(apiContext, config.ApiURL, undefined, undefined, { 'x-api-key': config.reqresApiKey });
        await use(client);
        await apiContext.dispose();
    },
    authenticatedClient: async ({}, use) => {
        const apiContext = await test_1.request.newContext();
        const config = loader_1.ConfigLoader.load();
        const baseClient = new ApiClient_1.ApiClient(apiContext, config.ApiURL);
        const authManager = new AuthManager_1.AuthManager(baseClient, {
            email: 'eve.holt@reqres.in',
            password: 'cityslicka'
        }, config.reqresApiKey);
        const client = new ApiClient_1.ApiClient(apiContext, config.ApiURL, authManager, undefined, { 'x-api-key': config.reqresApiKey });
        await use(client);
        await apiContext.dispose();
    },
    mockClient: async ({}, use) => {
        const apiContext = await test_1.request.newContext();
        const config = loader_1.ConfigLoader.load();
        const client = new ApiClient_1.ApiClient(apiContext, config.mockServerUrl);
        await use(client);
        await apiContext.dispose();
    }
});
var test_2 = require("@playwright/test");
Object.defineProperty(exports, "expect", { enumerable: true, get: function () { return test_2.expect; } });
