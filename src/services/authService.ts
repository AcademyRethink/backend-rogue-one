import { makeError } from '../middlewares/errorHandler';
import authRepository from '../repositories/authRepository';
import passwordHash from '../utils/passwordHash';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export async function login(email: string, password: string) {
  if (!email || !password) {
    throw makeError({ message: 'Email e senha são obrigatórios', status: 400 });
  }
  const user = await authRepository.findUserByEmail(email);

  if (!user) {
    throw makeError({ message: 'Email inválido', status: 400 });
  }

  if (!user.has_access) {
    throw makeError({
      message:
        'Assinatura suspensa por inadimplência. A plataforma será liberada após o pagamento.',
      status: 401
    });
  }

  if (user) {
    const isValid = await passwordHash.validateUser(password, user.password);

    if (isValid) {
      // generate token
      Reflect.deleteProperty(user, 'password');
      const token = jwt.sign(
        { userId: user.cnpj },
        String(process.env.SECRET_KEY),
        {
          expiresIn: '10h'
        }
      );
      return { ...user, token };
    } else {
      throw makeError({ message: 'Senha inválida', status: 400 });
    }
  }
}

export async function signUp(cnpj: string, email: string, password: string) {
  const user = await authRepository.findUserByEmail(email);

  if (!user) {
    const passwordHashed = await passwordHash.generatePassword(password);

    if (passwordHashed) {
      const newUser = authRepository.createUser(cnpj, email, passwordHashed);

      return newUser;
    }
  }
}

export async function resetPassword(email: string, password: string) {
  const user = await authRepository.findUserByEmail(email);

  if (user && user.token) {
    const passwordHashed = await passwordHash.generatePassword(password);

    if (passwordHashed) {
      const updatedUser = authRepository.updateUserPassword(
        email,
        passwordHashed
      );

      return updatedUser;
    }
  } else {
    throw makeError({
      message: 'Link de redefinição de senha expirado',
      status: 403
    });
  }
}

export async function sendPasswordResetEmail(email: string) {
  try {
    // Gerando um novo token
    const token = jwt.sign({ userId: email }, String(process.env.SECRET_KEY), {
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
    const urlResetPassword = `http://localhost:5173/reset-password?token=${token}`;

    await transporter.sendMail({
      from: String(process.env.USER),
      to: email,
      subject: 'Redefinição de Senha',
      html: `<h3>Olá! Clique no link abaixo para redefinir sua senha:<h3><br> <a href=${urlResetPassword}>Recupere a sua senha<a>`
    });
  } catch (error) {
    throw makeError({
      message: 'Erro ao enviar o e-mail de redefinição de senha',
      status: 500
    });
  }
}

export default { login, signUp, resetPassword, sendPasswordResetEmail };
