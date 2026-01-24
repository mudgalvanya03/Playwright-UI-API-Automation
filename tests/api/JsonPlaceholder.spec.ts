import { test, expect } from '@playwright/test';

test.describe('API testing CRUD {GET, POST, PUT, DELETE} using JsonPlaceholder', async() =>{
  test.use({
    baseURL: 'https://jsonplaceholder.typicode.com',
  });
  test('GET posts list - happy path', async ({ request }) => {
    const response = await request.get('/posts');

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);

    const firstPost = body[0];
    expect(firstPost).toHaveProperty('userId');
    expect(firstPost).toHaveProperty('id');
    expect(firstPost).toHaveProperty('title');
    expect(firstPost).toHaveProperty('body');
  });
});

