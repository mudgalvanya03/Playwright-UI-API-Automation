"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockOrderSchema = exports.MockUserSchema = void 0;
const zod_1 = require("zod");
exports.MockUserSchema = zod_1.z.object({
    id: zod_1.z.union([zod_1.z.string(), zod_1.z.number()]).optional(),
    name: zod_1.z.string().min(1),
    job: zod_1.z.string().min(1),
    email: zod_1.z.email()
});
exports.MockOrderSchema = zod_1.z.object({
    id: zod_1.z.union([zod_1.z.string(), zod_1.z.number()]).optional(),
    userId: zod_1.z.union([zod_1.z.string(), zod_1.z.number()]),
    product: zod_1.z.string().min(1),
    status: zod_1.z.enum(['pending', 'delivered', 'cancelled'])
});
