import { makeError } from '../middlewares/errorHandler';
import resetPasswordLoggedRepository from '../repositories/resetPasswordLoggedRepository';
import passwordHash from '../utils/passwordHash';

async function resetPasswordLoggedService(
  email: string,
  currentPassword: string,
  password: string
) {
  const user = await resetPasswordLoggedRepository.findUserById(email);

  if (!user) {
    throw makeError({ message: 'Usuário não encontrado', status: 500 });
  }

  const isCurrentPasswordCorrect =
    await resetPasswordLoggedRepository.checkCurrentPassword(
      email,
      currentPassword
    );

  if (!isCurrentPasswordCorrect) {
    throw makeError({ message: 'Senha atual incorreta', status: 400 });
  }

  const hashedNewPassword = await passwordHash.generatePassword(password);

  await resetPasswordLoggedRepository.updateUserPassword(
    email,
    hashedNewPassword
  );
}

export default { resetPasswordLoggedService };
