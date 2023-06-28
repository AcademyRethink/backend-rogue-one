import { Router } from 'express';
import { login,  forgotPassword, resetPassword,  signUp } from '../controllers/authController';

const router = Router();

router.post('/sign-up', signUp);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;