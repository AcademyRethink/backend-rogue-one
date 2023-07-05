import { describe, jest } from '@jest/globals';
import authRepository from '../../repositories/authRepository';
import { User } from '../../types/authType';
import authService from '../authService';
import passwordHash  from '../../utils/passwordHash';
import jwt from 'jsonwebtoken'


const tokenMock ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMTIyMjMzMzMwMDAxNTUiLCJpYXQiOjE2ODgwNDEyMzQsImV4cCI6MTY4ODA3NzIzNH0.d3o3_-ANSkupgzZWlFEvxQbut1EeD4g_gOm1eo6mOvo"


const pharmacyMock: User = {
    token: "6549dsfd",
    cnpj:'012223333000155',
    email:'vinicius.delmo@gmail.com',
    password: '123456',
    has_access: true
}

jest.mock('nodemailer');
jest.mock('jsonwebtoken');
jest.mock('../../repositories/authRepository');
describe('auth test', () => {
  describe('login test', () => {
    it('should return token with valid login credentials', async () => {
        jest.spyOn(authRepository, 'findUserByEmail').mockResolvedValueOnce(pharmacyMock)
        jest.spyOn(passwordHash, 'validateUser').mockResolvedValueOnce(true)
        jest.spyOn(jwt, 'sign').mockImplementation(()=> tokenMock)
        const result = await authService.login(pharmacyMock.email, pharmacyMock.password)
        expect(result).toMatch(tokenMock)
    });

    it('should throw an error for invalid email', async () => {
        jest.spyOn(authRepository, 'findUserByEmail').mockResolvedValueOnce(undefined);
  
        await expect(authService.login('invalidemail@example.com', 'password')).rejects.toThrow('Email inválido');
      });
  
      it('should throw an error for user without access', async () => {
        const userWithoutAccess = { ...pharmacyMock, has_access: false };
        jest.spyOn(authRepository, 'findUserByEmail').mockResolvedValueOnce(userWithoutAccess);
  
        await expect(authService.login(userWithoutAccess.email, userWithoutAccess.password)).rejects.toThrow('Assinatura suspensa por inadimplência. A plataforma será liberada após o pagamento');
      });
  });
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
        const password = 'newPassword';
        const hashedPassword = 'hashedPassword';
      
        jest.spyOn(authRepository, 'findUserByEmail').mockResolvedValueOnce(user);
        jest.spyOn(passwordHash, 'generatePassword').mockResolvedValueOnce(hashedPassword);
        jest.spyOn(authRepository, 'updateUserPassword').mockResolvedValueOnce(undefined);
      
        await expect(authService.resetPassword(email, password)).resolves.toBe(undefined);
        expect(authRepository.findUserByEmail).toHaveBeenCalledWith(email);
        expect(passwordHash.generatePassword).toHaveBeenCalledWith(password);
        expect(authRepository.updateUserPassword).toHaveBeenCalledWith(email, hashedPassword);
      });

    it('should throw an error for an expired password reset link', async () => {
        const email = 'vinicius.delmo@gmail.com';
      
        jest.spyOn(authRepository, 'findUserByEmail').mockResolvedValueOnce({ ...user, token: null });
      
        await expect(authService.resetPassword(email, 'newPassword')).rejects.toThrow('Link de redefinição de senha expirado');
        expect(authRepository.findUserByEmail).toHaveBeenCalledWith(email);
      });
  });
})