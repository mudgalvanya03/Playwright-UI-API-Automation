import { 
    CreateUserResponseSchema, 
    GetUserResponseSchema, 
    UserListSchema 
} from "../schemas/api/user.schema";
import type { 
    ValidatedGetUserResponse,  // whatever you named z.infer<typeof GetUserResponseSchema>
    ValidatedUserList,
    ValidatedCreateUserResponse,
} from "../schemas/api/user.schema";
import { EndpointContract } from "./ContractTypes";

export const getUserContract: EndpointContract<ValidatedGetUserResponse> = {
    name: 'GET /users/:id',
    method: 'GET',
    path: '/users/2',
    responseSchema: GetUserResponseSchema
}

export const getUserListContract: EndpointContract<ValidatedUserList> = {
    name: 'GET /users',
    method: 'GET',
    path: '/users',
    responseSchema: UserListSchema
}
export const getCreateUserContract: EndpointContract<ValidatedCreateUserResponse> = {
    name: 'POST /users',
    method: 'POST',
    path: '/users',
    responseSchema: CreateUserResponseSchema,
    requestBody: { name: 'Contract Test User', job: 'QA' }
}

