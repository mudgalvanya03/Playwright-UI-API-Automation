import { z } from 'zod'

export const UserSchema = z.object({
    id: z.number(),
    email: z.email(),
    first_name: z.string(),
    last_name: z.string(),
    avatar: z.url()
})

export const UserListSchema = z.object({
    data: z.array(UserSchema),
    page: z.number(),
    per_page: z.number(),
    total: z.number(),
    total_pages: z.number()
})

export const GetUserResponseSchema = z.object({
    data: UserSchema
})
export const CreateUserResponseSchema = z.object({
    name: z.string(),
    job: z.string(),
    id: z.string(),
    createdAt: z.iso.datetime()
})

export type ValidatedUser= z.infer<typeof UserSchema>
export type ValidatedUserList = z.infer<typeof UserListSchema>
export type ValidatedCreateUserResponse = z.infer<typeof CreateUserResponseSchema>
export type ValidatedGetUserResponse= z.infer<typeof GetUserResponseSchema>