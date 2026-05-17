import { APIRequestContext } from "@playwright/test";
import { ApiError } from "./ApiError";
import { IApiClient } from "./IApiClient";
import { logger} from './logger'
import { AuthManager } from "./AuthManager";

export class ApiClient implements IApiClient{

    constructor( private readonly request: APIRequestContext, 
        private readonly apiURL: string,
        private readonly authManager?: AuthManager){}
    
    private async buildHeaders(extraHeaders?: Record<string, string>): Promise<Record<string, string>> {
        const authHeaders = this.authManager? await this.authManager.getAuthHeaders(): {}

        return {
           ...authHeaders,
            ...extraHeaders
        }
    }
    
    async get<T>(url: string, headers?: Record<string, string>):Promise<T>{
        const finalHeaders = await this.buildHeaders(headers)
        logger.info("Sending GET request",{ url, method:"GET"});
        const response = await this.request.get(`${this.apiURL}${url}`,{ headers: finalHeaders} );
        if(!response.ok()){
            logger.error(`[API ERROR] GET ${url} | Status: ${response.status()}`);
            throw new ApiError('GET request failed', response.status(), url, 'GET')
        }
        
        logger.info(`[API RESPONSE] GET ${url} | Status: ${response.status()}`);
        const data = await response.json() as T;

        return data;
    }

    async put<T, B>(url: string, body: B, headers?: Record<string, string>):Promise<T> {
        const finalHeaders = await this.buildHeaders(headers)
        logger.info("Sending Put Request", {url, body, method:'PUT'});
        const response= await this.request.put(`${this.apiURL}${url}`, { data: body, headers:finalHeaders});
        if(!response.ok()){
            logger.error(`[API ERROR] ${url} | Status: ${response.status()}`);
            throw new ApiError('PUT request failed', response.status(), url, 'PUT')
        }
        
        logger.info(`[API Response] PUT ${url} | Status: ${response.status()}`);
        const data = await response.json() as T;

        return data;
    }

    async post<T, B>(url: string, body: B, headers?: Record<string, string>):Promise<T>{
        const finalHeaders = await this.buildHeaders(headers)
        logger.info("Sending Post Request", {url, body, method:'POST'});
        const response= await this.request.post(`${this.apiURL}${url}`, { data: body, headers:finalHeaders});
        if(!response.ok()){
            logger.error(`[API ERROR] ${url} | Status: ${response.status()}`);
            throw new ApiError('POST request failed', response.status(), url, 'POST')
        }
        
        logger.info(`[API Response] POST ${url} | Status: ${response.status()}`);
        const data = await response.json() as T;

        return data;
    }

    async patch<T, B>(url: string, body: B, headers?: Record<string,string>):Promise<T>{
        const finalHeaders = await this.buildHeaders(headers)
        logger.info("Sending Patch Request", {url, body, method:'PATCH'});
        const response= await this.request.patch(`${this.apiURL}${url}`, { data: body, headers:finalHeaders});
        if(!response.ok()){
            logger.error(`[API ERROR] ${url} | Status: ${response.status()}`);
            throw new ApiError('PATCH request failed', response.status(), url, 'PATCH')
        }
        
        logger.info(`[API Response] PATCH ${url} | Status: ${response.status()}`);
        const data = await response.json() as T;

        return data;
    }

    async delete<T>(url: string, headers?: Record<string, string>):Promise<T>{
        const finalHeaders = await this.buildHeaders(headers)
        logger.info("Sending delete Request", {url, method:'DELETE'});
        const response= await this.request.delete(`${this.apiURL}${url}`, { headers:finalHeaders});
        if(!response.ok()){
            logger.error(`[API ERROR] ${url} | Status: ${response.status()}`);
            throw new ApiError('DELETE request failed', response.status(), url, 'DELETE')
        }
        
        logger.info(`[API Response] DELETE ${url} | Status: ${response.status()}`);
        const data = await response.json() as T;

        return data;
    }

}