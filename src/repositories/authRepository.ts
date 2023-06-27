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

async function findUserByEmail(email: string): Promise<any> {
  try {
    const user = await db('pharmacy').where('email', email).first();
    return user;
  } catch (error) {
    console.log(error, 'error findUserByEmail');
    throw new Error('Erro ao buscar usuário por e-mail');
  }
}

async function createUser(
  cnpj: string,
  email: string,
  password: string
): Promise<any> {
  try {
    const user = await db('pharmacy').insert({
      cnpj,
      email,
      password,
      has_access: true
    });
    return user;
  } catch (error) {
    console.log(error, 'error createUser');
    throw new Error('Erro ao criar usuário');
  }
}

export default { findUserByEmail, createUser };
