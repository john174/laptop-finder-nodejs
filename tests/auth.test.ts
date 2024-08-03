// tests/auth.test.ts
import request from 'supertest';
import app from '../src/index'; // Now correctly importing the default export

describe('Auth API', () => {
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'test@example.com',
                password: 'password123',
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
    });

    it('should log in an existing user', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'password123',
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });
});
