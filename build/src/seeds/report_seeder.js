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
exports.seed = void 0;
const knex_1 = require("knex");
const knexfile_1 = __importDefault(require("../../knexfile"));
const knexInstance = (0, knex_1.knex)(knexfile_1.default);
const formatNumber = (text) => {
    return Math.round(parseFloat(text !== undefined ? text.replace(',', '.') : '0.00'));
};
function seed(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        const cnpj = '00111222000133';
        const date = new Date('2023-03-01T00:00:00');
        const reportData = yield fetch('https://v1.nocodeapi.com/delmo/google_sheets/qyqtfgOGTShTYIqq?tabId=report')
            .then((res) => res.json())
            .then((res) => res.data)
            .then((data) => data.map((product) => {
            return {
                cnpj: cnpj,
                category: product.category,
                ean: product.ean,
                molecule: product.molecule,
                laboratory: product.laboratory,
                product_name: product.product_name,
                sale_competitors_month: formatNumber(product.sale_competitors_month),
                sale_pharmacy_month: formatNumber(product.sale_pharmacy_month),
                month_year: date
            };
        }));
        // Inserts seed entries
        yield knex.batchInsert('report', reportData);
    });
}
exports.seed = seed;
