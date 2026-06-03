import { LoginRequest, LoginResponse, TokenCache } from "../types/api/auth.types";
import { IApiClient } from "./IApiClient";

export class AuthManager {
    private cache: TokenCache | null = null;

    /**
     * Creates an instance of AuthManager.
     *
     * @param client - The ApiClient instance used to make login requests
     * @param credentials - The login credentials (username/password or equivalent)
     * @param apiKey - The API key sent as `x-api-key` header during authentication
     */
    constructor(private readonly client: IApiClient, private readonly credentials: LoginRequest, private readonly apiKey: string){}

    /**
     * Returns a valid bearer token, using the cached token if it has not expired,
     * or fetching a fresh one if it has.
     *
     * @returns Promise resolving to a valid auth token string
     *
     * @example
     * const token = await authManager.getToken();
     */
    async getToken(): Promise<string>{
        if(this.cache && !this.isTokenExpired()){
            return this.cache.token
        }
        return await this.fetchToken()
        
    }

    /**
     * Checks whether the cached token has exceeded the allowed age (55 minutes).
     * Returns `true` if there is no cache or if the token is considered expired.
     *
     * @returns `true` if the token is expired or missing, `false` if still valid
     */
    private isTokenExpired(): boolean{
        if(!this.cache){
            return true
        }
        const age = Date.now()-this.cache.fetchedAt;
        return age> (55*60*1000);

    }

    /**
     * Performs a POST request to `/login` with the stored credentials and API key,
     * then caches the returned token alongside the current timestamp.
     *
     * @returns Promise resolving to the newly fetched token string
     * @throws {ApiError} When the login request fails or returns a non-ok status
     */
    private async fetchToken(): Promise<string>{
        const response = await this.client.post<LoginResponse, LoginRequest> ( '/login', this.credentials, { 'x-api-key': this.apiKey } )
        this.cache = {
            token: response.token,
            fetchedAt: Date.now()
        }
        return response.token
    }

    /**
     * Resolves a valid token via {@link getToken} and returns it formatted
     * as an `Authorization: Bearer` header object, ready to be merged into
     * any outgoing request.
     *
     * @returns Promise resolving to a headers record containing the Bearer token
     *
     * @example
     * const headers = await authManager.getAuthHeaders();
     * // { Authorization: 'Bearer eyJ...' }
     */
    async getAuthHeaders(): Promise<Record<string,string>>{
        const token= await this.getToken();
        return {
            Authorization: `Bearer ${token}`
        }
    }
}