"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthManager = void 0;
class AuthManager {
    client;
    credentials;
    apiKey;
    cache = null;
    constructor(client, credentials, apiKey) {
        this.client = client;
        this.credentials = credentials;
        this.apiKey = apiKey;
    }
    async getToken() {
        if (this.cache && !this.isTokenExpired()) {
            return this.cache.token;
        }
        return await this.fetchToken();
    }
    isTokenExpired() {
        if (!this.cache) {
            return true;
        }
        const age = Date.now() - this.cache.fetchedAt;
        return age > (55 * 60 * 1000);
    }
    async fetchToken() {
        const response = await this.client.post('/login', this.credentials, { 'x-api-key': this.apiKey });
        this.cache = {
            token: response.token,
            fetchedAt: Date.now()
        };
        return response.token;
    }
    async getAuthHeaders() {
        const token = await this.getToken();
        return {
            Authorization: `Bearer ${token}`
        };
    }
}
exports.AuthManager = AuthManager;
