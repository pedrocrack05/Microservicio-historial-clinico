import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './auth/auth.controller';
import historyRoutes from './histories/history.controller';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/histories', historyRoutes);

// Ruta base para verificar que funciona
app.get('/', (_req, res) => {
  res.send('Servidor de historial clínico funcionando ✅');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
