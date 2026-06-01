"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiClient = void 0;
const ApiError_1 = require("./ApiError");
const logger_1 = require("./logger");
const retryUtility_1 = require("./retryUtility");
class ApiClient {
    request;
    apiURL;
    authManager;
    retryOptions;
    defaultHeaders;
    constructor(request, apiURL, authManager, retryOptions, defaultHeaders) {
        this.request = request;
        this.apiURL = apiURL;
        this.authManager = authManager;
        this.retryOptions = retryOptions;
        this.defaultHeaders = defaultHeaders;
    }
    async buildHeaders(extraHeaders) {
        const authHeaders = this.authManager ? await this.authManager.getAuthHeaders() : {};
        return {
            ...this.defaultHeaders,
            ...authHeaders,
            ...extraHeaders
        };
    }
    async get(url, headers) {
        const finalHeaders = await this.buildHeaders(headers);
        logger_1.logger.info("Sending GET request", { url, method: "GET" });
        const makeRequest = async () => {
            const response = await this.request.get(`${this.apiURL}${url}`, { headers: finalHeaders });
            if (!response.ok()) {
                logger_1.logger.error(`[API ERROR] GET ${url} | Status: ${response.status()}`);
                throw new ApiError_1.ApiError('GET request failed', response.status(), url, 'GET');
            }
            logger_1.logger.info(`[API RESPONSE] GET ${url} | Status: ${response.status()}`);
            const data = await response.json();
            return data;
        };
        if (this.retryOptions) {
            return (0, retryUtility_1.withRetry)(makeRequest, this.retryOptions);
        }
        return makeRequest();
    }
    async put(url, body, headers) {
        const finalHeaders = await this.buildHeaders(headers);
        logger_1.logger.info("Sending Put Request", { url, body, method: 'PUT' });
        const makeRequest = async () => {
            const response = await this.request.put(`${this.apiURL}${url}`, { data: body, headers: finalHeaders });
            if (!response.ok()) {
                logger_1.logger.error(`[API ERROR] ${url} | Status: ${response.status()}`);
                throw new ApiError_1.ApiError('PUT request failed', response.status(), url, 'PUT');
            }
            logger_1.logger.info(`[API Response] PUT ${url} | Status: ${response.status()}`);
            const data = await response.json();
            return data;
        };
        if (this.retryOptions) {
            return (0, retryUtility_1.withRetry)(makeRequest, this.retryOptions);
        }
        return makeRequest();
    }
    async post(url, body, headers) {
        const finalHeaders = await this.buildHeaders(headers);
        logger_1.logger.info("Sending Post Request", { url, body, method: 'POST' });
        const makeRequest = async () => {
            const response = await this.request.post(`${this.apiURL}${url}`, { data: body, headers: finalHeaders });
            if (!response.ok()) {
                logger_1.logger.error(`[API ERROR] ${url} | Status: ${response.status()}`);
                throw new ApiError_1.ApiError('POST request failed', response.status(), url, 'POST');
            }
            logger_1.logger.info(`[API Response] POST ${url} | Status: ${response.status()}`);
            const data = await response.json();
            return data;
        };
        if (this.retryOptions) {
            return (0, retryUtility_1.withRetry)(makeRequest, this.retryOptions);
        }
        return makeRequest();
    }
    async patch(url, body, headers) {
        const finalHeaders = await this.buildHeaders(headers);
        logger_1.logger.info("Sending Patch Request", { url, body, method: 'PATCH' });
        const makeRequest = async () => {
            const response = await this.request.patch(`${this.apiURL}${url}`, { data: body, headers: finalHeaders });
            if (!response.ok()) {
                logger_1.logger.error(`[API ERROR] ${url} | Status: ${response.status()}`);
                throw new ApiError_1.ApiError('PATCH request failed', response.status(), url, 'PATCH');
            }
            logger_1.logger.info(`[API Response] PATCH ${url} | Status: ${response.status()}`);
            const data = await response.json();
            return data;
        };
        if (this.retryOptions) {
            return (0, retryUtility_1.withRetry)(makeRequest, this.retryOptions);
        }
        return makeRequest();
    }
    async delete(url, headers) {
        const finalHeaders = await this.buildHeaders(headers);
        logger_1.logger.info("Sending delete Request", { url, method: 'DELETE' });
        const makeRequest = async () => {
            const response = await this.request.delete(`${this.apiURL}${url}`, { headers: finalHeaders });
            if (!response.ok()) {
                logger_1.logger.error(`[API ERROR] ${url} | Status: ${response.status()}`);
                throw new ApiError_1.ApiError('DELETE request failed', response.status(), url, 'DELETE');
            }
            logger_1.logger.info(`[API Response] DELETE ${url} | Status: ${response.status()}`);
            //const data = await response.json() as T;
            // return data;
        };
        if (this.retryOptions) {
            return (0, retryUtility_1.withRetry)(makeRequest, this.retryOptions);
        }
        return makeRequest();
    }
}
exports.ApiClient = ApiClient;
