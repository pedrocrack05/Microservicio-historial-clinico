import { Router } from 'express';
import { authenticateJWT } from '../auth/auth.middleware';
import { HistoryService } from './history.service';
import { simulateDiagnosis } from '../utils/diagnosis'; // Simulador de diagnóstico

const router = Router();

// Proteger todas las rutas de este router
router.use(authenticateJWT as any);

// Crear historial clínico
router.post('/', async (req: any, res) => {
  try {
    const history = await HistoryService.createHistory({
      patientId: req.userId,
      diagnosis: req.body.diagnosis,
      treatment: req.body.treatment,
      doctorNotes: req.body.doctorNotes,
      symptoms: req.body.symptoms,
    });

    res.status(201).json(history);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Simula un diagnóstico basado en los síntomas del historial
router.post('/:id/suggest-diagnosis', (req, res, next) => {
    (async () => {
      try {
        const history = await HistoryService.getOne((req as any).userId, Number(req.params.id));
  
        if (!history) {
          return res.status(404).json({ error: 'Historial no encontrado' });
        }
  
        const { symptoms } = history;
        const suggestion = simulateDiagnosis(symptoms);
  
        return res.json({
          symptoms,
          suggestedDiagnosis: suggestion
        });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
    })().catch(next);
  });
  
  

// Obtener todos los historiales del usuario autenticado
router.get('/', async (req: any, res) => {
  try {
    const histories = await HistoryService.getHistories(req.userId);
    res.json(histories);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener historial por ID
router.get('/:id', (req, res, next) => {
    (async () => {
      try {
        const history = await HistoryService.getOne((req as any).userId, Number(req.params.id));
        if (!history) return res.status(404).json({ error: 'Historial no encontrado' });
        res.json(history);
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
    })().catch(next);
  });  

// Actualizar historial clínico
router.put('/:id', async (req: any, res) => {
  try {
    const updated = await HistoryService.updateHistory(req.userId, Number(req.params.id), req.body);
    res.json(updated);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar historial clínico
router.delete('/:id', async (req: any, res) => {
  try {
    const deleted = await HistoryService.deleteHistory(req.userId, Number(req.params.id));
    res.json(deleted);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
