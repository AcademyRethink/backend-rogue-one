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
const express_1 = __importDefault(require("express"));
const notificationRepository_1 = __importDefault(require("../repositories/notificationRepository"));
const router = express_1.default.Router();
// Rota para obter todos os produtos
router.get('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield notificationRepository_1.default.getAllProducts();
        res.json(products);
    }
    catch (error) {
        console.error('Erro ao obter todos os produtos:', error);
        res.status(500).json({ error: 'Ocorreu um erro ao obter os produtos' });
    }
}));
router.patch('/products/:ean', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ean } = req.params;
        const quantity = Number(req.body.quantity);
        const message = yield notificationRepository_1.default.updateProductByEan(quantity, ean);
        res.json(message);
    }
    catch (error) {
        console.error('Erro ao obter todos os produtos:', error);
        res.status(500).json({ error: 'Ocorreu um erro ao obter os produtos' });
    }
}));
exports.default = router;
