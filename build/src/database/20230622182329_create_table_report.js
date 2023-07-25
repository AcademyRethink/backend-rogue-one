"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.createTable("report", function (table) {
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
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex.schema.dropTable("report");
    });
}
exports.down = down;
