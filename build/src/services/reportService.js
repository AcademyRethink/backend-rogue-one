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
const reportRepository_1 = __importDefault(require("../repositories/reportRepository"));
const errorHandler_1 = require("../middlewares/errorHandler");
const selectProductsFromService = ({ limit = '100', orderSort = 'DESC', orderField = 'sale_competitors_month', category = '', period = '', cnpj = '' }) => __awaiter(void 0, void 0, void 0, function* () {
    if (cnpj === '') {
        throw (0, errorHandler_1.makeError)({ message: 'CNPJ é obrigatório', status: 400 });
    }
    if (category === '' || period === '') {
        throw (0, errorHandler_1.makeError)({
            message: 'Categoria e período são obrigatórios para realizar a busca',
            status: 400
        });
    }
    const whereQuery = reportRepository_1.default.whereConstructor({
        category,
        period,
        cnpj
    });
    const orderQuery = reportRepository_1.default.orderConstructor({
        orderField: orderField,
        orderSort: orderSort
    });
    const limitAsNumber = parseInt(limit);
    const products = yield reportRepository_1.default.selectProductsFromRepository(whereQuery, orderQuery, limitAsNumber);
    if (products.length === 0) {
        throw (0, errorHandler_1.makeError)({ message: 'Produto não encontrado', status: 404 });
    }
    const productsMap = products.map((el, index) => {
        if (orderSort.toUpperCase() === 'DESC') {
            return Object.assign({ position: index + 1 }, el);
        }
        if (orderSort.toUpperCase() === 'ASC') {
            return Object.assign({ position: products.length - index }, el);
        }
    });
    return productsMap;
});
const selectLaboratoryByProductFromService = ({ limit = '5', category, period, molecule, product_name, cnpj }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!cnpj) {
        throw (0, errorHandler_1.makeError)({ message: 'CNPJ é obrigatório', status: 400 });
    }
    const whereQuery = (category === null || category === void 0 ? void 0 : category.includes('GENERICO'))
        ? reportRepository_1.default.whereConstructor({
            period,
            product_name,
            cnpj
        })
        : reportRepository_1.default.whereConstructor({
            period,
            molecule,
            cnpj
        });
    const limitAsNumber = parseInt(limit);
    const result = yield reportRepository_1.default.selectLaboratoryByProductFromRepository({
        limit: limitAsNumber,
        whereQuery: whereQuery
    });
    if (result.length === 0) {
        throw (0, errorHandler_1.makeError)({ message: 'Laboratório não encontrado', status: 404 });
    }
    return result;
});
const getLastDate = (cnpj) => __awaiter(void 0, void 0, void 0, function* () {
    if (cnpj === '') {
        throw (0, errorHandler_1.makeError)({ message: 'CNPJ é obrigatório', status: 400 });
    }
    return reportRepository_1.default.getLastDate(cnpj);
});
exports.default = {
    selectProductsFromService,
    selectLaboratoryByProductFromService,
    getLastDate
};
