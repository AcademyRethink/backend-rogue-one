import { Router } from 'express';
import { login, resetPassword, signUp } from '../controllers/authController';

const router = Router();

router.post('/sign-up', signUp);
router.post('/login', login);
router.post('/reset-password', resetPassword);

export default router;