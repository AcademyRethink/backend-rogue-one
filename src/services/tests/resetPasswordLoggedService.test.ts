import { describe, jest } from '@jest/globals';
import resetPasswordLoggedRepository from '../../repositories/resetPasswordLoggedRepository';
import { User } from '../../types/authType';
import resetPasswordLoggedService from '../resetPasswordLoggedService';
import passwordHash from '../../utils/passwordHash';

jest.mock('../../repositories/resetPasswordLoggedRepository');
jest.mock('../../utils/passwordHash');

describe('resetPassword test', () => {
  const user: User = {
    token: 'resetToken',
    cnpj: '012223333000155',
    email: 'vinicius.delmo@gmail.com',
    password: 'oldPassword',
    has_access: true,
  };

  it('should reset the password for a valid user', async () => {
    const email = 'vinicius.delmo@gmail.com';
    const currentPassword = 'oldPassword';
    const newPassword = 'newPassword';
    const hashedPassword = 'hashedPassword';

    jest.spyOn(resetPasswordLoggedRepository, 'findUserById').mockResolvedValueOnce(user);
    jest.spyOn(resetPasswordLoggedRepository, 'checkCurrentPassword').mockResolvedValueOnce(true);
    jest.spyOn(passwordHash, 'generatePassword').mockResolvedValueOnce(hashedPassword);
    jest.spyOn(resetPasswordLoggedRepository, 'updateUserPassword').mockResolvedValueOnce(undefined);

    await expect(resetPasswordLoggedService.resetPasswordLoggedService(email, currentPassword, newPassword)).resolves.toBeUndefined();

    expect(resetPasswordLoggedRepository.findUserById).toHaveBeenCalledWith(email);
    expect(resetPasswordLoggedRepository.checkCurrentPassword).toHaveBeenCalledWith(email, currentPassword);
    expect(passwordHash.generatePassword).toHaveBeenCalledWith(newPassword);
    expect(resetPasswordLoggedRepository.updateUserPassword).toHaveBeenCalledWith(email, hashedPassword);
  });

  it('should throw an error for an incorrect current password', async () => {
    const email = 'vinicius.delmo@gmail.com';
    const currentPassword = 'incorrectPassword';
    const newPassword = 'newPassword';

    jest.spyOn(resetPasswordLoggedRepository, 'findUserById').mockResolvedValueOnce(user);
    jest.spyOn(resetPasswordLoggedRepository, 'checkCurrentPassword').mockResolvedValueOnce(false);

    await expect(resetPasswordLoggedService.resetPasswordLoggedService(email, currentPassword, newPassword)).rejects.toThrow('Senha atual incorreta');

    expect(resetPasswordLoggedRepository.findUserById).toHaveBeenCalledWith(email);
    expect(resetPasswordLoggedRepository.checkCurrentPassword).toHaveBeenCalledWith(email, currentPassword);
  });

  it('should throw an error for an invalid user', async () => {
    const email = 'vinicius.delmo@gmail.com';
    const currentPassword = 'oldPassword';
    const newPassword = 'newPassword';

    jest.spyOn(resetPasswordLoggedRepository, 'findUserById').mockResolvedValueOnce(undefined);

    await expect(resetPasswordLoggedService.resetPasswordLoggedService(email, currentPassword, newPassword)).rejects.toThrow('Usuário não encontrado');

    expect(resetPasswordLoggedRepository.findUserById).toHaveBeenCalledWith(email);
  });
});
