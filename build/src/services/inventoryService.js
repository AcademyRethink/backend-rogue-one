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
exports.selectProducts = exports.selectInventory = void 0;
const inventoryRepository_1 = __importDefault(require("../repositories/inventoryRepository"));
const selectInventory = (cnpj, sortBy, limit, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (cnpj === '')
            throw new Error('Invalid CNPJ');
        return yield inventoryRepository_1.default.selectInventory(cnpj, sortBy, limit, options);
    }
    catch (error) {
        if (error instanceof Error)
            throw new Error(error.message);
        throw new Error(`Unexpected error. ${error}`);
    }
});
exports.selectInventory = selectInventory;
/**
 * selectProducts - Return the products name list based on user's CNPJ matching product_name (using like clause) if passed.
 * @param {string} cnpj - The user's CNPJ
 * @param {string} [product_name] - String containg the products name (case insensitive).
 * @returns {string[]}
 */
const selectProducts = (cnpj) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (cnpj === '')
            throw new Error('Invalid CNPJ');
        return yield inventoryRepository_1.default.selectProducts(cnpj);
    }
    catch (error) {
        if (error instanceof Error)
            throw new Error(error.message);
        throw new Error(`Unexpected error. ${error}`);
    }
});
exports.selectProducts = selectProducts;
