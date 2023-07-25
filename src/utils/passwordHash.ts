import bcrypt from 'bcrypt';
import { makeError } from '../middlewares/errorHandler';

const saltRounds = 10;
async function generatePassword(password: string): Promise<string> {
  try {
    const passwordHash = await bcrypt.hash(password, saltRounds);
    return passwordHash;
  } catch (error) {
    throw makeError({
      message: 'Erro ao gerar a senha criptografada',
      status: 500
    });
  }
}
async function validateUser(
  password: string,
  hash: string
): Promise<boolean | undefined> {
  try {
    const isValid = await bcrypt.compare(password, hash);
    return isValid;
  } catch (error) {
    console.error((error as Error).message);
  }
}

export default {
  validateUser,
  generatePassword
};
