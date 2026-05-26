import { CreateUserRequest, CreateUserResponse, EmptyCreateUserResponse, GetUserResponse, PaginatedResponse, UpdateUserRequest, UpdateUserResponse, User } from '../../types/api/user.types';
import { ApiError } from '../../utils/ApiError';
import { updateUserFactory } from '../../utils/factories/patchUserFactory'
import { userFactory } from '../../utils/factories/userFactory';
import { test, expect } from '../fixtures/apiFixtures'

/* Commenting this boilerplate, because I have created custom fixtures
test.describe('Users API', ()=>{
    let client : ApiClient
    let authManager : AuthManager
    let apiContext: APIRequestContext

    test.beforeAll(async () => {
        apiContext = await playwrightRequest.newContext()
        const config = ConfigLoader.load()
        const baseClient = new ApiClient(apiContext, config.ApiURL)
        authManager = new AuthManager(baseClient, {
            email: 'eve.holt@reqres.in',
            password: 'cityslicka'
        }, config.reqresApiKey)

        client = new ApiClient(
            apiContext,
            config.ApiURL,
            undefined,
            undefined,
            { 'x-api-key': config.reqresApiKey })
    })

    test.afterAll(async () => {
        // dispose it yourself when done
         await apiContext.dispose()
     }) */

    test('API-TC01: Get user details successfully ', async ({ apiClient }) => {
        const response = await apiClient.get<GetUserResponse>('/users/2')

        expect(response.data.id).toBe(2)
        expect(typeof response.data.id).toBe('number');
        expect(typeof response.data.email).toContain('string');
        expect(response.data.email).toContain('@')
        expect(typeof response.data.first_name).toBe('string');
        expect(typeof response.data.last_name).toBe('string');
        expect(response.data.avatar).toContain('https');
    })

    test('API-TC02: Get user list', async({ apiClient}) =>{
        const response = await apiClient.get<PaginatedResponse<User>>('/users?page=1')

        expect(Array.isArray(response.data));
        expect(response.page).toBe(1);
        expect(typeof response.total).toBe('number');
        expect(response.data.length).toBeGreaterThan(0);

    })

    test('API-TC03: Non existent user', async({ apiClient }) =>{
        // await expect (client.get<GetUserResponse>('/users/999')).rejects.toThrow(ApiError) OR
        // try and catch block where we can access the status code and method as well
        try{
            await apiClient.get<GetUserResponse>('/users/999')
            throw new Error(
            'Should have thrown ApiError')
        }
        catch(error){
            if(error instanceof ApiError){
                expect(error.statusCode).toBe(404)
                expect(error.method).toBe('GET')
            }
        }
    })

    test('API-TC04: Post user', async({authenticatedClient})=>{
        
        const requestBody = userFactory.create({ name: 'Vanya', job: 'SDET' })

        const response = await authenticatedClient.post<CreateUserResponse, CreateUserRequest>('/users', requestBody)

        expect(typeof response.id).toBe('string')
        const newID = response.id.trim()
        expect(newID.length).toBeGreaterThan(0)
        expect(response.name).toBe(requestBody.name)
        expect(response.job).toBe(requestBody.job)
        expect(new Date(response.createdAt).toString()).not.toBe('Invalid Date')
    })

    test('API-TC05: Create user with empty body', async ({authenticatedClient}) => {
        const response = await authenticatedClient.post<
            EmptyCreateUserResponse,
            Record<string, never>
        >('/users', {})

        expect(typeof response.id).toBe('string')

        const trimmedId = response.id.trim()
        expect(trimmedId.length).toBeGreaterThan(0)

        expect(new Date(response.createdAt).toString()).not.toBe('Invalid Date')

        //expect(response.name).toBeUndefined()
        //expect(response.job).toBeUndefined()
    })

    test('API-TC06: update user with Patch', async({authenticatedClient})=>{

        const requestBody = updateUserFactory.create({ job: 'Senior Sdet'})

        const response = await authenticatedClient.patch<UpdateUserResponse,UpdateUserRequest>('/users/2', requestBody)
        expect(typeof response.job).toBe('string')
        expect(response.job).toBe(requestBody.job)
        expect(typeof response.updatedAt).toBe('string')
        expect(new Date(response.updatedAt).toString()).not.toBe('Invalid Date')
    })

    test('API-TC07: Full update user with put', async({authenticatedClient})=>{

        const requestBody = userFactory.create({ name: 'Vanya Mudgal', job: 'SDET III' })

        const response = await authenticatedClient.put<UpdateUserResponse, UpdateUserRequest>('/users/2', requestBody)
        expect(typeof response.job).toBe('string')
        expect(response.job).toBe(requestBody.job)
        expect(typeof response.name).toBe('string')
        expect(response.name).toBe(requestBody.name)
        expect(typeof response.updatedAt).toBe('string')
        expect(new Date(response.updatedAt).toString()).not.toBe('Invalid Date')
    })

    test('API-TC08: Delete user', async ({authenticatedClient}) => {
        await authenticatedClient.delete('/users/2')
    })