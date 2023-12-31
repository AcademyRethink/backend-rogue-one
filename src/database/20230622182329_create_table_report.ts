import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("report", function (table) {
        table.increments("report_id").primary();
        table.string("cnpj").notNullable();
        table.foreign("cnpj").references("pharmacy.cnpj");
        table.string("molecule").notNullable();
        table.string("laboratory").notNullable();
        table.string("ean").notNullable();
        table.string("product_name").notNullable();
        table.string("category").notNullable();
        table.float("sale_pharmacy_month").notNullable();
        table.float("sale_competitors_month").notNullable();
        table.date("month_year").notNullable();
        table.float('competitors_unity_price');
      });
    }

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("report");
  }
  

