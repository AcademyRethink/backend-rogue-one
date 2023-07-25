// Ajuste a função resetPasswordLogged no controller
import { Request, Response } from 'express';
import resetPasswordLoggedService from '../services/resetPasswordLoggedService';
import { makeError } from '../middlewares/errorHandler';

async function resetPasswordLogged(req: Request, res: Response) {
  try {
    const { currentPassword, newPassword, email } = req.body;

    if (!currentPassword || !newPassword) {
      throw makeError({
        message: 'Senha atual e nova senha são obrigatórias',
        status: 400
      });
    }

    await resetPasswordLoggedService.resetPasswordLoggedService(
      email,
      currentPassword,
      newPassword
    );

    res.status(200).json({
      message: 'Senha atualizada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao redefinir a senha:', error);
    throw makeError({
      message:
        (error as Error).message || 'Ocorreu um erro ao redefinir a senha',
      status: 400
    });
  }
}

export default { resetPasswordLogged };
