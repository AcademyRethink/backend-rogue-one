import knex from 'knex';
import { User } from '../types/authType';
import config from '../../knexfile';
import bcrypt from 'bcrypt';

const db = knex(config);

async function findUserById(userId: string): Promise<User | undefined> {
  try {
    const user = await db('pharmacy').where('email', userId).first();
    return user;
  } catch (error) {
    throw new Error('Erro ao buscar usuário');
  }
}

async function checkCurrentPassword(email: string, currentPassword: string): Promise<boolean> {
    try {
      const user = await db('pharmacy').where('email', email).first();
      
      if (!user) {
        return false; // O usuário não foi encontrado no banco de dados
      }
  
      // Verificar se a senha fornecida pelo usuário corresponde à senha criptografada no banco de dados
      const isValidPassword = await bcrypt.compare(currentPassword, user.password);
  
      return isValidPassword;
    } catch (error) {
      throw new Error('Erro ao verificar a senha atual do usuário');
    }
  }

async function updateUserPassword(email: string, newPassword: string): Promise<void> {
  try {
    await db('pharmacy').where('email', email).update({
      password: newPassword,
      token: null
    });
  } catch (error) {
    throw new Error('Erro ao atualizar a senha do usuário');
  }
}

export default { findUserById, checkCurrentPassword, updateUserPassword };
