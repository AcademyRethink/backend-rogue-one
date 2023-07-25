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
const reportService_1 = __importDefault(require("../services/reportService"));
const selectProductsFromController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cnpj, limit, orderSort, orderField, category, period } = req.query;
        const productsList = yield reportService_1.default.selectProductsFromService({
            cnpj: cnpj === null || cnpj === void 0 ? void 0 : cnpj.toString(),
            limit: limit === null || limit === void 0 ? void 0 : limit.toString(),
            orderSort: orderSort === null || orderSort === void 0 ? void 0 : orderSort.toString(),
            orderField: orderField === null || orderField === void 0 ? void 0 : orderField.toString(),
            category: category === null || category === void 0 ? void 0 : category.toString(),
            period: period === null || period === void 0 ? void 0 : period.toString()
        });
        res.status(200).json(productsList);
    }
    catch (error) {
        res.json(error);
    }
});
const selectLaboratoryByProductFromController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cnpj, limit, category, period, molecule, product_name } = req.query;
        const laboratoryList = yield reportService_1.default.selectLaboratoryByProductFromService({
            cnpj: cnpj === null || cnpj === void 0 ? void 0 : cnpj.toString(),
            limit: limit === null || limit === void 0 ? void 0 : limit.toString(),
            category: category === null || category === void 0 ? void 0 : category.toString(),
            period: period === null || period === void 0 ? void 0 : period.toString(),
            molecule: molecule === null || molecule === void 0 ? void 0 : molecule.toString(),
            product_name: product_name === null || product_name === void 0 ? void 0 : product_name.toString()
        });
        res.status(200).json(laboratoryList);
    }
    catch (error) {
        res.json(error);
    }
});
const getLastDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { cnpj } = req.query;
        const date = yield reportService_1.default.getLastDate((_a = cnpj === null || cnpj === void 0 ? void 0 : cnpj.toString()) !== null && _a !== void 0 ? _a : '');
        res.status(200).json(date);
    }
    catch (error) {
        res.json(error);
    }
});
exports.default = {
    selectProductsFromController,
    selectLaboratoryByProductFromController,
    getLastDate
};
