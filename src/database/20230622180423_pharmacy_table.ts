import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('pharmacy', function (table) {
    table.string('cnpj').primary().notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('pharmacy');
}
