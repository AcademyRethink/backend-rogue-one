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
exports.selectInventoryAndReportByPeriod = void 0;
const graphRepositories_1 = __importDefault(require("../repositories/graphRepositories"));
/**
 * Return a object containing the data grouped by year and month based on the given period. (Graph 2)
 * @param cnpj User's CNPJ
 * @param from String like date in format "yyyy-mm" representing the start date period.
 * @param to String like date in format "yyyy-mm" representing the end date period.
 * @param limitByMonth Number of elements by month (default: 100)
 * @returns
 */
const selectInventoryAndReportByPeriod = (cnpj, product_name, limit, completeLabel = false) => __awaiter(void 0, void 0, void 0, function* () {
    let data = {
        labels: [],
        datasets: [
            { label: 'Estoque', data: [] },
            { label: 'Venda mercado', data: [] },
            { label: 'Minhas vendas', data: [] }
        ]
    };
    const rawData = yield graphRepositories_1.default.selectInventoryAndReportBalance(cnpj, product_name, limit);
    data = rawData.reduce((acc, dataElement) => {
        acc.labels.push((completeLabel ? dataElement.month_year.getFullYear() + ' | ' : '') +
            dataElement.month_year
                .toLocaleString('pt-BR', {
                month: 'long'
            })
                .split('')
                .map((char, index) => (!index ? char.toUpperCase() : char))
                .join(''));
        acc.datasets[0].data.push(dataElement.sum_quantity);
        acc.datasets[1].data.push(dataElement.sum_competitors);
        acc.datasets[2].data.push(dataElement.sum_pharmacy);
        return acc;
    }, data);
    return data;
});
exports.selectInventoryAndReportByPeriod = selectInventoryAndReportByPeriod;
