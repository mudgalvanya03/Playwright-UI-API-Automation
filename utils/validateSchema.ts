import { ZodType } from 'zod'
import { logger } from './logger'

export function validateSchema<T>(schema: ZodType<T>, data: unknown): T {
    const result = schema.safeParse(data)
    
    if (!result.success) {
        const issues = result.error.issues
            .map(i => `${i.path.join('.')}: ${i.message}`)
            .join(', ')
        logger.error(`Schema validation failed: ${issues}`)
        throw new Error(`Schema validation failed: ${issues}`)
    }
    
    return result.data
}