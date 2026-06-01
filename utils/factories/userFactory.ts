import { DataFactory } from "../DataFactory"
import { CreateUserRequest } from "../../types/api/user.types"


const USER_DEFAULTS ={
    name: 'Test User',
    job: 'QA Engineer',
    //email: 'test@example.com',
    //role: 'viewer'
} satisfies CreateUserRequest;

export const userFactory = new DataFactory<CreateUserRequest>(USER_DEFAULTS)
