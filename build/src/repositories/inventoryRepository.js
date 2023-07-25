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
function validateCNPJ(cnpj) {
    // cnpj = cnpj.replace(/[^\d]+/g, '');
    // if (cnpj == '') return false;
    // if (cnpj.length != 14) return false;
    // // Elimina CNPJs invalidos conhecidos
    // if (
    //   cnpj == '00000000000000' ||
    //   cnpj == '11111111111111' ||
    //   cnpj == '22222222222222' ||
    //   cnpj == '33333333333333' ||
    //   cnpj == '44444444444444' ||
    //   cnpj == '55555555555555' ||
    //   cnpj == '66666666666666' ||
    //   cnpj == '77777777777777' ||
    //   cnpj == '88888888888888' ||
    //   cnpj == '99999999999999'
    // )
    //   return false;
    // // Valida DVs
    // let length = cnpj.length - 2;
    // let numbers = cnpj.substring(0, length);
    // const digits = cnpj.substring(length);
    // let sum = 0;
    // let pos = length - 7;
    // for (let i = length; i >= 1; i--) {
    //   sum += Number(numbers.charAt(length - i)) * pos--;
    //   if (pos < 2) pos = 9;
    // }
    // let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    // if (result != Number(digits.charAt(0))) return false;
    // length = length + 1;
    // numbers = cnpj.substring(0, length);
    // sum = 0;
    // pos = length - 7;
    // for (let i = length; i >= 1; i--) {
    //   sum += Number(numbers.charAt(length - i)) * pos--;
    //   if (pos < 2) pos = 9;
    // }
    // result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    // if (result != Number(digits.charAt(1))) return false;
    return true;
}
/**
 * Get the inventory balance for the specif filtering if passed or totally otherwise.
 * @param cnpj User's CNPJ with no format . or -, just the numbers.
 * @param product_name (Optional) String containing the product name, completely or partially, for filtering (case insensitive).
 * @param year (Optional) Year in string form.
 * @param month (Optional) Month in string for (January = 1, February = 2, etc.)
 * @param category (Optional) Category string for filtering (case insensitive).
 * @returns {InventoryRecord[]}
 */
const selectInventory = (cnpj, sortBy, limit, options) => __awaiter(void 0, void 0, void 0, function* () {
    if (!validateCNPJ(cnpj))
        throw new Error('Invalid CNPJ');
    return yield knexInstance('inventory')
        .select('*')
        .where({ cnpj })
        .modify((query) => {
        query = (options === null || options === void 0 ? void 0 : options.year)
            ? query.whereRaw('EXTRACT(YEAR FROM date) = ?', options === null || options === void 0 ? void 0 : options.year)
            : query;
        query = (options === null || options === void 0 ? void 0 : options.month)
            ? query.whereRaw('EXTRACT(MONTH FROM date) = ?', options === null || options === void 0 ? void 0 : options.month)
            : query;
        query = (options === null || options === void 0 ? void 0 : options.category)
            ? query.whereILike('category', `%${options === null || options === void 0 ? void 0 : options.category}%`)
            : query;
        query = (options === null || options === void 0 ? void 0 : options.product_name)
            ? query.whereILike('product_name', `%${options === null || options === void 0 ? void 0 : options.product_name}%`)
            : query;
        query = sortBy
            ? sortBy.reduce((acc, [column, mode]) => acc.orderBy(column, mode), query)
            : query;
        query = limit ? query.limit(limit) : query;
    });
});
/**
 * selectProducts - Return the products name list based on user's CNPJ matching product_name (using like clause) if passed.
 * @param {string} cnpj - The user's CNPJ
 * @param {string} [product_name] - String containg the products name (case insensitive).
 * @returns {string[]}
 */
const selectProducts = (cnpj) => __awaiter(void 0, void 0, void 0, function* () {
    if (!validateCNPJ(cnpj))
        throw new Error('Invalid CNPJ');
    return yield knexInstance('inventory')
        .where(`inventory.cnpj`, cnpj)
        .join('report', 'report.product_name', 'inventory.product_name')
        .select('inventory.product_name')
        .sum({
        sum_pharmacy: 'report.sale_pharmacy_month',
        sum_competitors: 'report.sale_competitors_month'
    })
        .groupBy('inventory.product_name')
        .orderBy('sum_pharmacy', 'desc')
        .orderBy('sum_competitors', 'desc')
        .pluck('inventory.product_name');
});
exports.default = { selectInventory, selectProducts };
