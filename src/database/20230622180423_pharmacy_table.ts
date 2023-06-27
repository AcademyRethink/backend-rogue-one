import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('pharmacy', function (table) {
    table.string('cnpj').primary().notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.boolean('has_access').notNullable().defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('pharmacy');
}
