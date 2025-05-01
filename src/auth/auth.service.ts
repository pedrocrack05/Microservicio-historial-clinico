// src/auth/auth.service.ts
import { prisma } from '../prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export class AuthService {
  static async register(email: string, password: string) {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw new Error('Usuario ya registrado');

    const hashedPassword = await bcrypt.hash(password, 10);
    return await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }

  static async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('Credenciales inválidas');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Credenciales inválidas');

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: '1d',
    });

    return { token };
  }
}
