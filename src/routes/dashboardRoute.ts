import { Router } from 'express';

const router = Router();

router.post('/home', (req, res) => {
  console.log('to autenticado');
  return res.json({ ok: true });
});

router.get('/relatorio', (req, res) => {
  console.log('to autenticado');
  return res.json({ ok: true });
});

export default router;
