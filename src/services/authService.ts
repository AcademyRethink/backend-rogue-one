import authRepository from '../repositories/authRepository';
import passwordHash from '../utils/passwordHash';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export async function login(email: string, password: string) {
  if (!email || !password) {
    throw new Error('Email e senha são obrigatórios');
  }
  const user = await authRepository.findUserByEmail(email)

  if (!user) {
    throw new Error('Email inválido');
  }

  if (!user.has_access) {
    throw new Error('Assinatura suspensa por inadimplência. A plataforma será liberada após o pagamento.');
  }

  if (user) {
    const isValid = await passwordHash.validateUser(password, user.password);

    if (isValid) {
      // generate token
      Reflect.deleteProperty(user, 'password')
      const token = jwt.sign(
        { userId: user.cnpj },
        String(process.env.SECRET_KEY),
        {
          expiresIn: '10h'
        }
      );
      return {...user ,token};
    } else {
      throw new Error('Senha inválida');
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
        user: String(process.env.EMAIL_USER),
        pass: String(process.env.PASS) 
      }
    });
    const urlResetPassword = `http://localhost:5173/reset-password?token=${token}`;

    await transporter.sendMail({
      from: String(process.env.EMAIL_USER),
      to: email,
      subject: 'Redefinição de Senha',
      html: `<h3>Olá! Clique no link abaixo para redefinir sua senha:<h3><br> <a href=${urlResetPassword}>Recupere a sua senha<a>`
    });
  
  } catch (error) {
    throw new Error('Erro ao enviar o e-mail de redefinição de senha');
  }
}

export default { login, signUp, resetPassword, sendPasswordResetEmail };
