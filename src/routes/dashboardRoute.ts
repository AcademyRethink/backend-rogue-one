import { Router } from 'express';

const router = Router();

router.post('/home', (req, res) => {
  return res.json({ ok: true });
});

router.get('/report', (req, res) => {
  return res.json({ message: "Seja bem vindo" });
});

export default router;
