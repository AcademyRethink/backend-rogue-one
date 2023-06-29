import knex from 'knex';
import { User } from '../types/authType';

const db = knex({
  client: 'pg',
  connection: {
    host: 'db.izvxtownguxnlolhpaoe.supabase.co',
    user: 'postgres',
    password: 'F5!$@wAGp@@6kHf',
    database: 'postgres',
    port: 5432
  }
});

export async function findUserByEmail(email: string): Promise<User | undefined> {
  try {
    const user = await db('pharmacy').where('email', email).first();
    return user;
  } catch (error) {
    throw new Error('Erro ao buscar email');
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
    throw new Error('Erro ao criar usuário');
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
    throw new Error('Erro ao criar usuário');
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
    throw new Error('Erro ao atualizar senha');
  }
}

export default { findUserByEmail, createUser, updateUser, updateUserPassword };
