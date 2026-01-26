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

  test('POST create post - happy path', async ({request})=>{ 
    const response =await request.post('/posts', {
      data: {
        title: 'API Testing with Playwright',
        body: 'This is a sample post created via API automation',
        userId: 1,
      },
    });
    expect(response.status()).toBe(201);
    const body = await response.json();

    expect(body).toHaveProperty('id');
    expect(body.title).toBe('API Testing with Playwright');
    expect(body.body).toBe('This is a sample post created via API automation');
    expect(body.userId).toBe(1);
  });
    
  test('PUT update post - happy path' , async ({request})=>{
    const response = await request.put('/posts/1',{
      data:{
        id: 1,
        title: 'Updated- API Testing with Playwright',
        body: 'updated- This is a sample post created via API automation',
        userId: 1,
      },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();

    expect(body).toHaveProperty('id');
    expect(body.title).toBe('Updated- API Testing with Playwright');
    expect(body.body).toBe('updated- This is a sample post created via API automation');
    expect(body.userId).toBe(1);
  }); 

  test('PATCH update post title only', async ({ request }) => {
    const response = await request.patch('/posts/1', {
      data: {
       title: 'Updated title via PATCH',
     },
   });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.title).toBe('Updated title via PATCH');
    //expect(body.body).toBe('updated- This is a sample post created via API automation'); returns only patched data
    //expect(body.userId).toBe(1);
  });


  test('DELETE post', async ({request})=>{
    const response= await request.delete('/posts/1');
    expect(response.status()).toBe(200);
  }); 

  test('Get post -invalid ID, negative scenario', async ({request})=>{
    const response = await request.get('/posts/999999999');
    expect(response.status()).toBe(404);
  });

  test('PUT update post without correct endpoint - negative path' , async ({request})=>{
    const response = await request.put('/posts',{
      data:{
        id: 1,
        title: 'Updated- API Testing with Playwright',
        body: 'updated- This is a sample post created via API automation',
        userId: 1,
      },
    });
    expect(response.status()).toBe(404);
  }); 

  test('POST without complete payload - negative path', async ({request})=>{
    const response = await request.post('/posts', {
      data: {
        id: 2 ,
        title: 'NEW POST WITHOUT BODY',
      },
    });
    expect(response.status()).toBe(201);
    const body = await response.json();

    expect(body).toHaveProperty('id');
    expect(body.title).toBe('NEW POST WITHOUT BODY');
  });



});

