
import { MockOrder, MockUser } from "../../types/api/mock.types";
import { ApiError } from "../../utils/ApiError";
import { test, expect } from '../fixtures/apiFixtures'


test.describe.configure({ mode: 'serial' }) // to save from race condition
test('MOCK-TC01: Create user then create order for that user - Complete CRUD for microservice testing', async ({ mockClient }) => {
    const requestBody: MockUser = {
        name: 'Vanya Mudgal',
        job: 'SDET',
        email: 'vanya@test.com'
    }
    const createdUser = await mockClient.post<MockUser, MockUser >('/users', requestBody)

    expect(createdUser.id).toBeDefined()
    expect(String(createdUser.id).length).toBeGreaterThan(0) 
    expect(createdUser.name).toBe(requestBody.name)
    expect(createdUser.email).toBe(requestBody.email)
    expect(createdUser.job).toBe(requestBody.job)


    const orderBody: MockOrder ={
        userId: createdUser.id!,  //! at the end signifies that 'Dont worry TS bro, I have asserted its not gonna be undefined'
        product: 'laptop', 
        status: 'delivered'
    }

    const createdOrder= await mockClient.post<MockOrder,MockOrder>('/orders', orderBody)

    expect(createdOrder.id).toBeDefined()
    expect(String(createdOrder.id).length).toBeGreaterThan(0) 
    expect(createdOrder.userId).toBe(createdUser.id)

    const fetchedOrder= await mockClient.get<MockOrder>(`/orders/${createdOrder.id}`)
    expect(fetchedOrder.userId).toBe(createdUser.id)

    await mockClient.delete(`/users/${createdUser.id}`)
    //await expect (mockClient.get<MockUser>(`/users/${createdUser.id}`)).rejects.toThrow(ApiError)
    try {
    await mockClient.get<MockUser>(
            `/users/${createdUser.id}`
        )
        throw new Error(
            'Should have thrown ApiError'
        )
    } catch(error: unknown) {
        if(error instanceof ApiError) {
            expect(error.statusCode).toBe(404)
            expect(error.method).toBe('GET')
        }
    } 
})