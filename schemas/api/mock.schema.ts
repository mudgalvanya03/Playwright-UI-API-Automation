import { z } from 'zod'

export const MockUserSchema = z.object({
    id: z.union([z.string(), z.number()]).optional(),
    name: z.string().min(1),
    job: z.string().min(1),
    email: z.email()
})

export const MockOrderSchema = z.object({
    id: z.union([z.string(), z.number()]).optional(),
    userId: z.union([z.string(), z.number()]),
    product: z.string().min(1),
    status: z.enum(['pending', 'delivered', 'cancelled'])
})

export type ValidatedUser= z.infer<typeof MockUserSchema>
export type ValidatedUserList = z.infer<typeof MockOrderSchema>
