import type { Knex } from 'knex';

// Update with your config settings.

const config: Knex.Config = {
  client: 'pg',
  connection:
    'postgres://postgres:ZO7v8JDelpd2T3Oj@db.oyuqabhjjhpxdvfctcio.supabase.co:6543/postgres',
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/database'
  }
};

module.exports = config;
