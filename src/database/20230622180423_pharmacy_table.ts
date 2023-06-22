import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('pharmacy', function (table) {
    table.string('cnpj').unique();
    table.string('email');
    table.string('password');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('pharmacy');
}
