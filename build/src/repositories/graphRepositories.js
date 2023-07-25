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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("../../knexfile"));
const knexInstance = (0, knex_1.default)(knexfile_1.default);
const selectInventoryAndReportBalance = (cnpj, product_name, limit) => __awaiter(void 0, void 0, void 0, function* () {
    return yield knexInstance('inventory')
        .where('inventory.cnpj', cnpj)
        .modify((query) => product_name
        ? query.whereILike('inventory.product_name', `%${product_name}%`)
        : query)
        .join('report', (query) => query
        .on('report.product_name', '=', 'inventory.product_name')
        .andOn("inventory.cnpj", "=", "report.cnpj")
        .andOn('report.ean', '=', 'inventory.ean'))
        .whereRaw('inventory.date = report.month_year AND inventory.date IS NOT NULL OR inventory.date IS NULL')
        .select('month_year')
        .sum({
        sum_competitors: 'sale_competitors_month',
        sum_pharmacy: 'sale_pharmacy_month',
        sum_quantity: 'quantity'
    })
        .groupBy('month_year')
        .orderBy('month_year', 'asc')
        .modify((query) => (limit ? query.limit(limit) : query));
});
exports.default = { selectInventoryAndReportBalance };
