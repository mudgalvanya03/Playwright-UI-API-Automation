import { test, expect, request } from '@playwright/test';
import { ApiClient } from '../../utils/ApiClient';
import { ConfigLoader } from '../../config/loader';

test.describe.configure({ mode: 'serial' })
test.describe('Error Simulation Tests', () => {

    test('Retry utility recovers from transient 503 errors', async () => {

        const apiContext = await request.newContext();

        const config = ConfigLoader.load();

        const apiClient = new ApiClient(
            apiContext,
            config.mockServerUrl,   // points to localhost:3001
            undefined,
            {
                maxAttempts: 3,
                delayMs: 500
            }
        );

        const response = await apiClient.post(
            '/users',
            {
                name: 'Vanya',
                job: 'SDET'
            }
        );

        expect(response).toBeDefined();

        await apiContext.dispose();
    });

    test('Request eventually fails when retries are exhausted', async () => {

        const apiContext = await request.newContext();

        const config = ConfigLoader.load();

        const apiClient = new ApiClient(
            apiContext,
            config.mockServerUrl,
            undefined,
            {
                maxAttempts: 2,
                delayMs: 200
            }
        );

        await expect(
            apiClient.post(
                '/users',
                {
                    name: 'Vanya',
                    job: 'SDET'
                }
            )
        ).rejects.toThrow();

        await apiContext.dispose();
    });

});