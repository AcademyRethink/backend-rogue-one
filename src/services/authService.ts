import authRepository from '../repositories/authRepository';
import { validateUser, generatePassword } from '../utils/passwordHash';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export async function login(email: string, password: string) {
  if (!email || !password) {
    throw new Error('Email e senha são obrigatórios');
  }
  const user = await authRepository.findUserByEmail(email);

  if (!user) {
    throw new Error('Email inválido');
  }

  if (!user.has_access) {
    throw new Error('Assinatura suspensa por inadimplência. A plataforma será liberada após o pagamento');
  }

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
    } else {
      throw new Error('Senha inválida');
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
  } else {
    throw new Error('Link de redefinição de senha expirado');
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
    const urlResetPassword = `https://pharmacy-rogueone.com.br/auth/reset-password?token=${token}`;

    await transporter.sendMail({
      from: String(process.env.USER),
      to: email,
      subject: 'Redefinição de Senha',
      html: `<h3>Olá! Clique no link abaixo para redefinir sua senha:<h3><br> <a href=${urlResetPassword}>Recupere a sua senha<a>`
    });
    console.log('E-mail de redefinição de senha enviado para:', email);
  } catch (error) {
    throw new Error('Erro ao enviar o e-mail de redefinição de senha');
  }
}

export default { login, signUp, resetPassword, sendPasswordResetEmail };
