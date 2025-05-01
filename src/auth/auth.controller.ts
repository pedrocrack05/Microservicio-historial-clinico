// src/auth/auth.controller.ts
import { Router } from 'express';
import { AuthService } from './auth.service';
import { authenticateJWT } from './auth.middleware';

const router = Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await AuthService.register(email, password);
    res.status(201).json({ message: 'Usuario registrado', user: { id: user.id, email: user.email } });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await AuthService.login(email, password);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
});

export default router;
