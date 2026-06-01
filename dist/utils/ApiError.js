"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    statusCode;
    url;
    method;
    constructor(message, statusCode, url, method) {
        super(message);
        this.statusCode = statusCode;
        this.url = url;
        this.method = method;
        this.name = 'ApiError';
    }
}
exports.ApiError = ApiError;
