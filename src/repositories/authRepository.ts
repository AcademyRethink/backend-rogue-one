import knex from 'knex';
import { User } from '../types/authType';
import config from '../../knexfile';
import { makeError } from '../middlewares/errorHandler';

const db = knex(config);

export async function findUserByEmail(
  email: string
): Promise<User | undefined> {
  try {
    const user = await db('pharmacy').where('email', email).first();
    return user;
  } catch (error) {
    throw makeError({ message: 'Erro ao buscar email', status: 500 });
  }
}

export async function createUser(
  cnpj: string,
  email: string,
  password: string
): Promise<User> {
  try {
    const user: User = await db('pharmacy').insert({
      cnpj,
      email,
      password,
      has_access: true
    });
    return user;
  } catch (error) {
    throw makeError({ message: 'Erro ao criar usuário', status: 500 });
  }
}

export async function updateUser(email: string, token: string): Promise<void> {
  try {
    await db('pharmacy')
      .update({
        token
      })
      .where({ email });
  } catch (error) {
    throw makeError({ message: 'Erro ao criar usuário', status: 500 });
  }
}

export async function updateUserPassword(
  email: string,
  password: string
): Promise<void> {
  try {
    await db('pharmacy')
      .update({
        password,
        token: null
      })
      .where({ email });
  } catch (error) {
    throw makeError({ message: 'Erro ao atualizar senha', status: 500 });
  }
}

export default { findUserByEmail, createUser, updateUser, updateUserPassword };
