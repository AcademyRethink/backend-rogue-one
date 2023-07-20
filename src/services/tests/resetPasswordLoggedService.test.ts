/* import resetPasswordLoggedRepository from '../../repositories/resetPasswordLoggedRepository';
import passwordHash from '../../utils/passwordHash';
import resetPasswordLoggedService from '../resetPasswordLoggedService';

jest.mock('../repositories/resetPasswordLoggedRepository');
jest.mock('../utils/passwordHash');

describe('resetPasswordLoggedService test', () => {
  it('should reset the password for a valid user', async () => {
    const email = 'user@example.com';
    const currentPassword = 'oldPassword';
    const newPassword = 'newPassword';
    const hashedNewPassword = 'hashedNewPassword';

    jest.spyOn(resetPasswordLoggedRepository, 'findUserById').mockResolvedValueOnce({ email });
    jest.spyOn(resetPasswordLoggedRepository, 'checkCurrentPassword').mockResolvedValueOnce(true);
    jest.spyOn(passwordHash, 'generatePassword').mockResolvedValueOnce(hashedNewPassword);
    jest.spyOn(resetPasswordLoggedRepository, 'updateUserPassword').mockResolvedValueOnce(undefined);

    await expect(resetPasswordLoggedService(email, currentPassword, newPassword)).resolves.toBeUndefined();
    
    // Verificando se as funções foram chamadas corretamente
    expect(resetPasswordLoggedRepository.findUserById).toHaveBeenCalledWith(email);
    expect(resetPasswordLoggedRepository.checkCurrentPassword).toHaveBeenCalledWith(email, currentPassword);
    expect(passwordHash.generatePassword).toHaveBeenCalledWith(newPassword);
    expect(resetPasswordLoggedRepository.updateUserPassword).toHaveBeenCalledWith(email, hashedNewPassword);
  });

  it('should throw an error for an invalid user', async () => {
    const email = 'user@example.com';
    const currentPassword = 'oldPassword';
    const newPassword = 'newPassword';

    // Mockando a função do repositório que retorna um usuário inválido (não encontrado)
    jest.spyOn(resetPasswordLoggedRepository, 'findUserById').mockResolvedValueOnce(undefined);

    await expect(resetPasswordLoggedService(email, currentPassword, newPassword)).rejects.toThrow('Usuário não encontrado');

    // Verificando se a função foi chamada corretamente
    expect(resetPasswordLoggedRepository.findUserById).toHaveBeenCalledWith(email);
  });

  it('should throw an error for an incorrect current password', async () => {
    const email = 'user@example.com';
    const currentPassword = 'incorrectPassword';
    const newPassword = 'newPassword';


    jest.spyOn(resetPasswordLoggedRepository, 'findUserById').mockResolvedValueOnce({ email });
    jest.spyOn(resetPasswordLoggedRepository, 'checkCurrentPassword').mockResolvedValueOnce(false);

    await expect(resetPasswordLoggedService(email, currentPassword, newPassword)).rejects.toThrow('Senha atual incorreta');

    expect(resetPasswordLoggedRepository.findUserById).toHaveBeenCalledWith(email);
    expect(resetPasswordLoggedRepository.checkCurrentPassword).toHaveBeenCalledWith(email, currentPassword);
  });
});
 */