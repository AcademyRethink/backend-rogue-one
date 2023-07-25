import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('pharmacy', function (table) {
    table.string('cnpj').primary().notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('token').nullable();
    table.boolean('has_access').notNullable().defaultTo(false);
    table.text('token');
    table.text('name');
    table.date('birth_date');
    table.text('country');
    table.text('account_type');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('pharmacy');
}
