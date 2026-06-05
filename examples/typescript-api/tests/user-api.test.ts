import request from 'supertest';
import { app } from '../src/presentation/app';

describe('User API', () => {
  it('should return health status', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'ok',
      timestamp: expect.any(String),
    });
  });

  it('should create and fetch a user', async () => {
    const createResponse = await request(app)
      .post('/api/users')
      .send({ email: 'test@example.com', name: 'Test User' });

    expect(createResponse.status).toBe(201);
    expect(createResponse.body).toMatchObject({
      id: expect.any(String),
      email: 'test@example.com',
      name: 'Test User',
      status: 'pending',
    });

    const userId = createResponse.body.id as string;
    const getResponse = await request(app).get(`/api/users/${userId}`);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toEqual(createResponse.body);
  });

  it('should reject case-insensitive duplicate emails', async () => {
    await request(app)
      .post('/api/users')
      .send({ email: 'duplicate@example.com', name: 'User 1' })
      .expect(201);

    const duplicateResponse = await request(app)
      .post('/api/users')
      .send({ email: 'DUPLICATE@EXAMPLE.COM', name: 'User 2' });

    expect(duplicateResponse.status).toBe(409);
    expect(duplicateResponse.body).toEqual({
      error: {
        code: 'USER_ALREADY_EXISTS',
        message: "User with email 'duplicate@example.com' already exists",
      },
    });
  });

  it('should reject invalid user id format', async () => {
    const response = await request(app).get('/api/users/not-a-uuid');

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
  });
});
