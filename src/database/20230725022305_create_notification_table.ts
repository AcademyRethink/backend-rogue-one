import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('notification', function (table) {
    table.increments('id').primary();
    table.bigInteger('ean');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.text('message');
    table.integer('notification_id');
    table.boolean('resolved_notification').defaultTo(false);
    table.boolean('viewed').defaultTo(false);
    table.string('cnpj');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('notification');
}
