import { APIRequestContext } from "@playwright/test";
import { ApiError } from "./ApiError";
import { IApiClient } from "./IApiClient";
import { logger} from './logger'
import { AuthManager } from "./AuthManager";
import { RetryOptions, withRetry } from "./retryUtility";

export class ApiClient implements IApiClient{

    constructor( private readonly request: APIRequestContext, 
        private readonly apiURL: string,
        private readonly authManager?: AuthManager,
        private readonly retryOptions?: RetryOptions,
        private readonly defaultHeaders?: Record<string, string>){}
    
    private async buildHeaders(extraHeaders?: Record<string, string>): Promise<Record<string, string>> {
        const authHeaders = this.authManager? await this.authManager.getAuthHeaders(): {}

        return {
            ...this.defaultHeaders,
           ...authHeaders,
            ...extraHeaders
        }
    }
    /**
     * Executes a GET request against the configured API base URL, merging auth headers and default headers before sending. Wraps the request in retry logic if retryOptions are configured.
     *
     * @param url - The endpoint path relative to the base API URL
     * @param headers - Optional additional headers to merge with defaults
     * @returns Promise resolving to the typed response body
     * @throws {ApiError} When the response status is not ok
     *
     * @example
     * const user = await apiClient.get<User>('/users/2');
     */
    async get<T>(url: string, headers?: Record<string, string>):Promise<T>{
        const finalHeaders = await this.buildHeaders(headers)
        logger.info("Sending GET request",{ url, method:"GET"});
        const makeRequest = async () => {const response = await this.request.get(`${this.apiURL}${url}`,{ headers: finalHeaders });
        if(!response.ok()){
            logger.error(`[API ERROR] GET ${url} | Status: ${response.status()}`);
            throw new ApiError('GET request failed', response.status(), url, 'GET')
        }
        
        logger.info(`[API RESPONSE] GET ${url} | Status: ${response.status()}`);
        const data = await response.json() as T;

        return data;
        }
        if (this.retryOptions) {
            return withRetry(makeRequest, this.retryOptions)
        }

        return makeRequest()        
    }

        /**
     * Executes a PUT request against the configured API base URL, merging auth headers and default headers before sending. Wraps the request in retry logic if retryOptions are configured.
     * 
     *
     * @param url - The endpoint path relative to the base API URL
     * @param body - The data payload to send in the PUT request fully typed as B
     * @param headers - Optional additional headers to merge with defaults
     * @returns Promise resolving to the typed response body
     * @throws {ApiError} When the response status is not ok
     *
     * @example
     * const user = await apiClient.put<CreateUserResponse, CreateUserRequest>('/users/2', requestBody);
     */
    async put<T, B>(url: string, body: B, headers?: Record<string, string>):Promise<T> {
        const finalHeaders = await this.buildHeaders(headers)
        logger.info("Sending Put Request", {url, body, method:'PUT'});
        const makeRequest = async () => {const response = await this.request.put(`${this.apiURL}${url}`,{ data: body, headers: finalHeaders });
        if(!response.ok()){
            logger.error(`[API ERROR] ${url} | Status: ${response.status()}`);
            throw new ApiError('PUT request failed', response.status(), url, 'PUT')
        }
        
        logger.info(`[API Response] PUT ${url} | Status: ${response.status()}`);
        const data = await response.json() as T;

        return data;
    }
        if (this.retryOptions) {
            return withRetry(makeRequest, this.retryOptions)
        }

        return makeRequest()
    }

        /**
     * Executes a POST request against the configured API base URL, merging auth headers and default headers before sending. Wraps the request in retry logic if retryOptions are configured.
     *
     * @param url - The endpoint path relative to the base API URL
     * @param body - The data payload to send in the POST request fully typed as B
     * @param headers - Optional additional headers to merge with defaults
     * @returns Promise resolving to the typed response body
     * @throws {ApiError} When the response status is not ok
     *
     * @example
     * const user = await apiClient.post<CreateUserResponse, CreateUserRequest>('/users/2', requestBody);
     */
    async post<T, B>(url: string, body: B, headers?: Record<string, string>):Promise<T>{
        const finalHeaders = await this.buildHeaders(headers)
        logger.info("Sending Post Request", {url, body, method:'POST'});
        const makeRequest = async () => {const response = await this.request.post(`${this.apiURL}${url}`,{ data: body, headers: finalHeaders });
        if(!response.ok()){
            logger.error(`[API ERROR] ${url} | Status: ${response.status()}`);
            throw new ApiError('POST request failed', response.status(), url, 'POST')
        }
        
        logger.info(`[API Response] POST ${url} | Status: ${response.status()}`);
        const data = await response.json() as T;

        return data;
    }
        if (this.retryOptions) {
            return withRetry(makeRequest, this.retryOptions)
        }

        return makeRequest()
    }

        /**
     * Executes a PATCH request against the configured API base URL, merging auth headers and default headers before sending. Wraps the request in retry logic if retryOptions are configured.
     *
     * @param url - The endpoint path relative to the base API URL
     * @param body - The data payload to send in the PATCH request fully typed as B
     * @param headers - Optional additional headers to merge with defaults
     * @returns Promise resolving to the typed response body
     * @throws {ApiError} When the response status is not ok
     *
     * @example
     * const user = await apiClient.patch<CreateUserResponse, CreateUserRequest>('/users/2', requestBody);
     */
    async patch<T, B>(url: string, body: B, headers?: Record<string,string>):Promise<T>{
        const finalHeaders = await this.buildHeaders(headers)
        logger.info("Sending Patch Request", {url, body, method:'PATCH'});
        const makeRequest = async () => {const response = await this.request.patch(`${this.apiURL}${url}`,{ data: body, headers: finalHeaders });
        if(!response.ok()){
            logger.error(`[API ERROR] ${url} | Status: ${response.status()}`);
            throw new ApiError('PATCH request failed', response.status(), url, 'PATCH')
        }
        
        logger.info(`[API Response] PATCH ${url} | Status: ${response.status()}`);
        const data = await response.json() as T;

        return data;
    }
        if (this.retryOptions) {
            return withRetry(makeRequest, this.retryOptions)
        }

        return makeRequest()
    }

        /**
     * Executes a DELETE request against the configured API base URL, merging auth headers and default headers before sending. Wraps the request in retry logic if retryOptions are configured.
     *
     * @param url - The endpoint path relative to the base API URL
     * @param headers - Optional additional headers to merge with defaults
     * @returns Promise that resolves when deletion is confirmed
     * @throws {ApiError} When the response status is not ok
     *
     * @example
     * await apiClient.delete('/users/2');
     */
    async delete(url: string, headers?: Record<string, string>):Promise<void>{
        const finalHeaders = await this.buildHeaders(headers)
        logger.info("Sending delete Request", {url, method:'DELETE'});
        const makeRequest = async () => {const response = await this.request.delete(`${this.apiURL}${url}`,{ headers: finalHeaders });
        if(!response.ok()){
            logger.error(`[API ERROR] ${url} | Status: ${response.status()}`);
            throw new ApiError('DELETE request failed', response.status(), url, 'DELETE')
        }
        
        logger.info(`[API Response] DELETE ${url} | Status: ${response.status()}`);
        //const data = await response.json() as T;

       // return data;
    }
        if (this.retryOptions) {
            return withRetry(makeRequest, this.retryOptions)
        }

        return makeRequest()
    }

}