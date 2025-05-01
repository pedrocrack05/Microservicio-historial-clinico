import request from 'supertest';
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from '../auth/auth.controller';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

describe('Auth endpoints', () => {
  it('debería registrar un nuevo usuario', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        email: `test-${Date.now()}@correo.com`,
        password: '123456'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('user');
  });
});

describe('Auth endpoints', () => {
  it('debería registrar un nuevo usuario', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        email: `test-${Date.now()}@example.com`,
        password: '123456'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('user');
  });

  it('debería loguear un usuario existente y retornar un token', async () => {
    const testEmail = `login-${Date.now()}@example.com`;
    const testPassword = '123456';

    // Registrar primero
    await request(app)
      .post('/auth/register')
      .send({ email: testEmail, password: testPassword });

    // Ahora hacer login
    const res = await request(app)
      .post('/auth/login')
      .send({ email: testEmail, password: testPassword });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toBe('string');
  });
});

