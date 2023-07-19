import resetPasswordLoggedRepository  from '../repositories/resetPasswordLoggedRepository';
import passwordHash from '../utils/passwordHash';

async function resetPasswordLoggedService(
    email: string,
    currentPassword: string,
    password: string
  ) {
    // Implemente a lógica para verificar a senha atual do usuário e atualizar a nova senha no banco de dados
    const user = await resetPasswordLoggedRepository.findUserById(email);
  
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
  
    // Implemente a lógica para verificar se a senha atual do usuário corresponde à senha armazenada no banco de dados
    const isCurrentPasswordCorrect = await resetPasswordLoggedRepository.checkCurrentPassword(email, currentPassword);
  
    if (!isCurrentPasswordCorrect) {
      throw new Error('Senha atual incorreta');
    }

    const hashedNewPassword = await passwordHash.generatePassword(password);
  
    // Implemente a lógica para atualizar a nova senha no banco de dados
    await resetPasswordLoggedRepository.updateUserPassword(email, hashedNewPassword);
  }
  
  export default {resetPasswordLoggedService};