import { DataFactory } from "../DataFactory"
import { UpdateUserRequest } from "../../types/api/user.types"


const USER_DEFAULTS ={
    //name: 'Test User',
    //job: 'QA Engineer',
    //email: 'test@example.com',
    //role: 'viewer'
} as const

export const updateUserFactory = new DataFactory<UpdateUserRequest>(USER_DEFAULTS)
