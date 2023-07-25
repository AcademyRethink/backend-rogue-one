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
const errorHandler_1 = require("../middlewares/errorHandler");
const categoryRepository_1 = __importDefault(require("../repositories/categoryRepository"));
const getAll = ({ cnpj }) => __awaiter(void 0, void 0, void 0, function* () {
    if ((cnpj === null || cnpj === void 0 ? void 0 : cnpj.trim()) === '' || cnpj === undefined) {
        throw (0, errorHandler_1.makeError)({ message: 'CNPJ é obrigatório', status: 400 });
    }
    return yield categoryRepository_1.default.getCategories({ cnpj });
});
exports.default = { getAll };
