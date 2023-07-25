import knex from 'knex';
import { User } from '../types/authType';
import config from '../../knexfile';
import bcrypt from 'bcrypt';
import { makeError } from '../middlewares/errorHandler';

const db = knex(config);

async function findUserById(userId: string): Promise<User | undefined> {
  try {
    const user = await db('pharmacy').where('email', userId).first();
    return user;
  } catch (error) {
    throw makeError({ message: 'Erro ao buscar usuário', status: 500 });
  }
}

async function checkCurrentPassword(
  email: string,
  currentPassword: string
): Promise<boolean> {
  try {
    const user = await db('pharmacy').where('email', email).first();

    if (!user) {
      return false;
    }

    const isValidPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );

    return isValidPassword;
  } catch (error) {
    throw makeError({
      message: 'Erro ao verificar a senha atual do usuário',
      status: 500
    });
  }
}

async function updateUserPassword(
  email: string,
  newPassword: string
): Promise<void> {
  try {
    await db('pharmacy').where('email', email).update({
      password: newPassword,
      token: null
    });
  } catch (error) {
    throw makeError({
      message: 'Erro ao atualizar a senha do usuário',
      status: 500
    });
  }
}

export default { findUserById, checkCurrentPassword, updateUserPassword };
