import authRepository from '../repositories/authRepository';
import { validateUser, generatePassword } from '../utils/passwordHash';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config();

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
      return token;
    }
    else{
      throw new Error('Invalid password')
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

export async function resetPassword(email: string, password: string) {
  const user = await authRepository.findUserByEmail(email);

  if (user && user.token) {
    const passwordHash = await generatePassword(password);

    if (passwordHash) {
      const updatedUser = authRepository.updateUserPassword(
        email,
        passwordHash
      );

      return updatedUser;
    }
  }
  else{
    throw new Error('Reset password expired')
  }
}

export async function sendPasswordResetEmail(email: string) {
  try {
    // Gerando um novo token
    const token = jwt.sign({ userId: email }, String(process.env.SECRET_KEYS), {
      expiresIn: '1h'
    });

    // Update no banco com o novo token gerado para o usuário que tera a senha resetada
    await authRepository.updateUser(email, token);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: String(process.env.USER),
        pass: String(process.env.PASS)
      }
    });

    const urlResetPassword = `https://pharmacy-rogueone.com.br/auth/reset-password?token=${token}`;

    await transporter.sendMail({
      from: String(process.env.USER),
      to: email,
      subject: 'Redefinição de Senha',
      html: `Olá! Clique no link abaixo para redefinir sua senha.<br> <a href=${urlResetPassword}>Recupere a sua senha<a>`
    });
    console.log('E-mail de redefinição de senha enviado para:', email);
  } catch (error) {
    console.error('Erro ao enviar o e-mail de redefinição de senha:', error);
    throw new Error('Erro ao enviar o e-mail de redefinição de senha');
  }
}

export default { login, signUp, resetPassword, sendPasswordResetEmail };
