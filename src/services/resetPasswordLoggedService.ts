import resetPasswordLoggedRepository  from '../repositories/resetPasswordLoggedRepository';
import passwordHash from '../utils/passwordHash';

async function resetPasswordLoggedService(
    email: string,
    currentPassword: string,
    password: string
  ) {
    
    const user = await resetPasswordLoggedRepository.findUserById(email);
  
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
  
    const isCurrentPasswordCorrect = await resetPasswordLoggedRepository.checkCurrentPassword(email, currentPassword);
  
    if (!isCurrentPasswordCorrect) {
      throw new Error('Senha atual incorreta');
    }

    const hashedNewPassword = await passwordHash.generatePassword(password);
  

    await resetPasswordLoggedRepository.updateUserPassword(email, hashedNewPassword);
  }
  
  export default {resetPasswordLoggedService};