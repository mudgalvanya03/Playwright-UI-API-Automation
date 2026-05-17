import { LoginRequest, LoginResponse, TokenCache } from "../types/api/auth.types";
import { ApiClient } from "./ApiClient";

export class AuthManager {
    private cache: TokenCache | null = null;
    constructor(private readonly client: ApiClient, private readonly credentials: LoginRequest, private readonly apiKey: string){}
    
    async getToken(): Promise<string>{
        if(this.cache && !this.isTokenExpired()){
            return this.cache.token
        }
        return await this.fetchToken()
        
    }
    private isTokenExpired(): boolean{
        if(!this.cache){
            return true
        }
        const age = Date.now()-this.cache.fetchedAt;
        return age> (55*60*1000);

    }
    private async fetchToken(): Promise<string>{
        const response = await this.client.post<LoginResponse, LoginRequest> ( '/login', this.credentials, { 'x-api-key': this.apiKey } )
        this.cache = {
            token: response.token,
            fetchedAt: Date.now()
        }
        return response.token
    }

    async getAuthHeaders(): Promise<Record<string,string>>{
        const token= await this.getToken();
        return {
            Authorization: `Bearer ${token}`
        }
    }
}