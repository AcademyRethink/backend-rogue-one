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
const categoryService_1 = __importDefault(require("../services/categoryService"));
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cnpj } = req.query;
        const categories = yield categoryService_1.default.getAll({ cnpj: cnpj === null || cnpj === void 0 ? void 0 : cnpj.toString() });
        res.status(200).json(categories);
    }
    catch (error) {
        res.json(error);
    }
});
exports.default = { index };
