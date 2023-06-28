import { Router } from 'express';

const router = Router();

router.post('/home', (req, res) => {
  return res.json({ ok: true });
});

router.get('/relatorio', (req, res) => {
  return res.json({ ok: true });
});

export default router;
