import { logger } from "./logger";

export interface RetryOptions{
    maxAttempts: number
    delayMs: number
    retryOn?: (error:unknown) => boolean
}

export async function withRetry<T>( fn: () => Promise<T> , options: RetryOptions): Promise<T>{

    for(let attempt = 1; attempt <= options.maxAttempts; attempt++){
        try{
            const result = await fn();
                return result
        }
        catch(error:unknown){
            if (error instanceof Error) {
                logger.warn(`Attempt ${attempt} failed: ${error.message}`)
            } else {
                logger.warn(`Attempt ${attempt} failed: ${String(error)}`)
            }
            const shouldRetry = options.retryOn ? options.retryOn(error) : true
            if(!shouldRetry || attempt === options.maxAttempts){
                throw error
            }
            await new Promise(resolve => setTimeout(resolve, options.delayMs))

        }
        
    }
    throw new Error('Retry unexpectedly failed')
}