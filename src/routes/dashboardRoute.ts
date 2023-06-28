import { Router } from 'express';
import { router as reportRouter } from './reportRoutes';

const router = Router();

router.post('/home', (req, res) => {
  console.log('to autenticado');
  return res.json({ ok: true });
});

router.use('/report', reportRouter);

export default router;