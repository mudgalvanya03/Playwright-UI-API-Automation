"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withRetry = withRetry;
const logger_1 = require("./logger");
async function withRetry(fn, options) {
    for (let attempt = 1; attempt <= options.maxAttempts; attempt++) {
        try {
            const result = await fn();
            return result;
        }
        catch (error) {
            if (error instanceof Error) {
                logger_1.logger.warn(`Attempt ${attempt} failed: ${error.message}`);
            }
            else {
                logger_1.logger.warn(`Attempt ${attempt} failed: ${String(error)}`);
            }
            const shouldRetry = options.retryOn ? options.retryOn(error) : true;
            if (!shouldRetry || attempt === options.maxAttempts) {
                throw error;
            }
            await new Promise(resolve => setTimeout(resolve, options.delayMs));
        }
    }
    throw new Error('Retry unexpectedly failed');
}
