// authController.ts
import { Request, Response } from 'express';
import authService from '../services/authService';

export async function login(req: Request, res: Response): Promise<void> {
  // Lógica de autenticação e geração do token
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const token = await authService.login(email, password);
    res.json({ token });
  } catch (error) {
    console.log(error, 'error');
    res.status(400).json({ error });
  }
}

export async function signUp(req: Request, res: Response): Promise<void> {
  try {
    const { email, password, cnpj } = req.body;
    console.log(req.body);
    const token = await authService.signUp(cnpj, email, password);
    res.json({ token });
  } catch (error) {
    console.log(error, 'error');
    res.status(400).json({ error });
  }
}

export async function resetPassword(
  req: Request,
  res: Response
): Promise<void> {
  // Lógica de redefinição de senha
  try {
    const { email } = req.body;
    await authService.resetPassword(email);
    res.json({ message: 'Password reset email sent.' });
  } catch (error) {
    res.status(400).json({ error });
  }
}

export default { login, resetPassword, signUp };
