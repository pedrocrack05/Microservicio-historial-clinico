import request from 'supertest';
import express from 'express';
import authRoutes from '../auth/auth.controller';
import historyRoutes from '../histories/history.controller';

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/histories', historyRoutes);

describe('Histories endpoints', () => {
  let token: string;

  beforeAll(async () => {
    const email = `history-${Date.now()}@example.com`;
    const password = '123456';

    // Registro
    await request(app)
      .post('/auth/register')
      .send({ email, password });

    // Login
    const res = await request(app)
      .post('/auth/login')
      .send({ email, password });

    token = res.body.token;
  });

  it('debería crear un historial clínico para el usuario autenticado', async () => {
    const res = await request(app)
      .post('/histories')
      .set('Authorization', `Bearer ${token}`)
      .send({
        diagnosis: 'Faringitis',
        treatment: 'Antibióticos y descanso',
        doctorNotes: 'Reevaluar en 7 días',
        symptoms: 'fiebre, dolor de garganta'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.diagnosis).toBe('Faringitis');
  });
});
