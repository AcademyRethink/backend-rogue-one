// Ajuste a função resetPasswordLogged no controller
import { Request, Response } from 'express';
import resetPasswordLoggedService from '../services/resetPasswordLoggedService';

async function resetPasswordLogged(req: Request, res: Response) {
  try {
    const { currentPassword, newPassword, email } = req.body;

    if (!currentPassword || !newPassword) {
      throw new Error('Senha atual e nova senha são obrigatórias');
    }

    // Obter os dados do usuário armazenados no LocalStorage

    // Chamar o serviço para atualizar a senha do usuário
    await resetPasswordLoggedService.resetPasswordLoggedService(email, currentPassword, newPassword);

    res.status(200).json({
      message: 'Senha atualizada com sucesso',
    });
  } catch (error) {
    console.error('Erro ao redefinir a senha:', error);
    res.status(400).json({
      message: (error as Error).message || 'Ocorreu um erro ao redefinir a senha',
    });
  }
}

export default { resetPasswordLogged };
