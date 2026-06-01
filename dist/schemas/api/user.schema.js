"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserResponseSchema = exports.GetUserResponseSchema = exports.UserListSchema = exports.UserSchema = void 0;
const zod_1 = require("zod");
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.number(),
    email: zod_1.z.email(),
    first_name: zod_1.z.string(),
    last_name: zod_1.z.string(),
    avatar: zod_1.z.url()
});
exports.UserListSchema = zod_1.z.object({
    data: zod_1.z.array(exports.UserSchema),
    page: zod_1.z.number(),
    per_page: zod_1.z.number(),
    total: zod_1.z.number(),
    total_pages: zod_1.z.number()
});
exports.GetUserResponseSchema = zod_1.z.object({
    data: exports.UserSchema
});
exports.CreateUserResponseSchema = zod_1.z.object({
    name: zod_1.z.string(),
    job: zod_1.z.string(),
    id: zod_1.z.string(),
    createdAt: zod_1.z.iso.datetime()
});
