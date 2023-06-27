import authRepository from '../repositories/authRepository';
import { validateUser, generatePassword } from '../utils/passwordHash';
import jwt from 'jsonwebtoken';

export async function login(email: string, password: string) {
  const user = await authRepository.findUserByEmail(email);

  if (user) {
    const isValid = await validateUser(password, user.password);

    if (isValid) {
      // generate token

      const token = jwt.sign(
        { userId: user.cnpj },
        String(process.env.SECRET_KEYS),
        {
          expiresIn: '10h'
        }
      );

      console.log('login efetuado');
      return token;
    }
  }
}

export async function signUp(cnpj: string, email: string, password: string) {
  const user = await authRepository.findUserByEmail(email);

  if (!user) {
    const passwordHash = await generatePassword(password);

    if (passwordHash) {
      const newUser = authRepository.createUser(cnpj, email, passwordHash);

      return newUser;
    }
  }
}

export async function resetPassword(email: string): Promise<void> {
  console.log('password alterado');
}

export default { login, signUp, resetPassword };
