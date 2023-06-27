import bcrypt from 'bcrypt';

const saltRounds = 10;

export async function generatePassword(
  password: string
): Promise<string | undefined> {
  try {
    const passwordHash = await bcrypt.hash(password, saltRounds);

    console.log('Hash generated', passwordHash);
    return passwordHash;
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function validateUser(
  password: string,
  hash: string
): Promise<boolean | undefined> {
  try {
    console.log(password, 'password');
    console.log(hash, 'hash');
    const isValid = await bcrypt.compare(password, hash);
    console.log(isValid, 'isValid');
    return isValid;
  } catch (error: any) {
    console.error(error.message);
  }
}
