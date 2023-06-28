import knex from 'knex';

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

async function findUserByEmail(email: string): Promise<User | undefined> {
  try {
    const user = await db('pharmacy').where('email', email).first();
    return user;
  } catch (error) {
    throw new Error('Error fetching user by email');
  }
}
interface User {
  token: User | undefined;
  cnpj: string;
  email: string;
  password: string;
  has_access: boolean;
}

async function createUser(
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
    throw new Error('Error creating user');
  }
}

async function updateUser(email: string, token: string): Promise<void> {
  try {
    await db('pharmacy')
      .update({
        token
      })
      .where({ email });
  } catch (error) {
    throw new Error('Error updating user');
  }
}

async function updateUserPassword(
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
    throw new Error('Error updating user');
  }
}

export default { findUserByEmail, createUser, updateUser,updateUserPassword };
