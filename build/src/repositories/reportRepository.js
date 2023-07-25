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
const whereConstructor = ({ category, period, molecule, product_name, cnpj }) => {
    const whereQuery = [];
    if (category)
        whereQuery.push(`category ILIKE '%${category}%'`);
    if (period)
        whereQuery.push(`month_year = '%${period}%'`);
    if (molecule)
        whereQuery.push(`molecule ILIKE '%${molecule}%'`);
    if (product_name)
        whereQuery.push(`product_name ILIKE '%${product_name}%'`);
    if (cnpj)
        whereQuery.push(`cnpj = '${cnpj}'`);
    return whereQuery.join(' AND ');
};
const orderConstructor = ({ orderField, orderSort }) => {
    return `${orderField} ${orderSort}`;
};
const selectProductsFromRepository = (whereQuery, orderQuery, limit) => __awaiter(void 0, void 0, void 0, function* () {
    return yield knexInstance('report')
        .select('*')
        .whereRaw(whereQuery)
        .orderByRaw(orderQuery)
        .limit(limit);
});
const selectLaboratoryByProductFromRepository = ({ limit, whereQuery }) => __awaiter(void 0, void 0, void 0, function* () {
    return yield knexInstance('report')
        .select('laboratory', 'molecule', 'product_name', 'sale_competitors_month')
        .whereRaw(whereQuery)
        .limit(limit)
        .orderBy('sale_competitors_month', 'desc');
});
const getLastDate = (cnpj) => __awaiter(void 0, void 0, void 0, function* () {
    return yield knexInstance('report')
        .select('month_year')
        .limit(1)
        .where({ cnpj })
        .orderBy('month_year', 'desc');
});
exports.default = {
    whereConstructor,
    orderConstructor,
    selectProductsFromRepository,
    selectLaboratoryByProductFromRepository,
    getLastDate
};
