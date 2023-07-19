import { Router } from 'express';
import  resetPasswordLogged from '../controllers/resetPasswordLoggedController';

const router = Router();

router.post('/reset-password-logged', resetPasswordLogged.resetPasswordLogged);

export default router;
