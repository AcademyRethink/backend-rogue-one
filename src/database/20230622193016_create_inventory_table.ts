import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('inventory', (table) => {
    table.increments('id').primary();
    table.string('cnpj').references('cnpj').inTable('pharmacy');
    table.string('product_name').notNullable();
    table.string('ean').notNullable();
    table.integer('quantity').checkPositive().notNullable();
    table.integer('min_quantity').checkPositive().notNullable();
    table.string('category').notNullable();
    table.date('date').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('inventory');
}
