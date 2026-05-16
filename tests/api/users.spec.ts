import { test, expect } from '@playwright/test';
import { ConfigLoader } from '../../config/loader';
import { ApiClient } from '../../utils/ApiClient';
import { GetUserResponse } from '../../types/api/user.types';

test('API-TC01: Get user details successfully', async ({ request }) => {

    // Step 1 — Load config
    const config = ConfigLoader.load();

    // Step 2 — Create API client
    const client = new ApiClient(
        request,
        config.ApiURL
    );

    // Step 3 — Call API
    const response =
        await client.get<GetUserResponse>(
            '/users/2',
               {
        'x-api-key': config.reqresApiKey
    });

    // Step 4 — Assertions
    expect(response.data.id).toBe(2);
    expect(response.data.email).toContain('@');
    expect(response.data.first_name).toBeTruthy();
    expect(response.data.last_name).toBeTruthy();
    expect(response.data.avatar).toContain('https');
});