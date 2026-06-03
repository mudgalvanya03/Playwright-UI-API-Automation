/**
 * Represents an HTTP API error with full context about the failed request.
 * Extends the native `Error` class and sets `name` to `'ApiError'` for
 * reliable `instanceof` checks and stack-trace identification.
 *
 * @example
 * throw new ApiError('GET request failed', 404, '/users/2', 'GET');
 *
 * @example
 * try {
 *   await apiClient.get('/users/2');
 * } catch (err) {
 *   if (err instanceof ApiError) {
 *     console.error(err.statusCode, err.method, err.url);
 *   }
 * }
 */
export class ApiError extends Error{

    /**
     * @param message - Human-readable description of the failure
     * @param statusCode - HTTP status code returned by the server (e.g. 404, 500)
     * @param url - The endpoint path that was requested (e.g. `/users/2`)
     * @param method - The HTTP method used (e.g. `'GET'`, `'POST'`)
     */
    constructor(
        message : string,
        public readonly statusCode: number,
        public readonly url: string,
        public readonly method: string
    ){
        super(message)
        this.name = 'ApiError'
    }
}