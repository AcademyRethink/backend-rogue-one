import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('inventory', (table) => {
    table.increments('id').primary();
    table.string('cnpj').references('cnpj').inTable('pharmacy');
    table.string('product_name');
    table.integer('product_id').references('product_id').inTable('report');
    table.integer('quantity').checkPositive();
    table.string('category').references('category').inTable('report');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('inventory');
}
