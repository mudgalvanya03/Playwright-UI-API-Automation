"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = validateSchema;
const logger_1 = require("./logger");
function validateSchema(schema, data) {
    const result = schema.safeParse(data);
    if (!result.success) {
        const issues = result.error.issues
            .map(i => `${i.path.join('.')}: ${i.message}`)
            .join(', ');
        logger_1.logger.error(`Schema validation failed: ${issues}`);
        throw new Error(`Schema validation failed: ${issues}`);
    }
    return result.data;
}
