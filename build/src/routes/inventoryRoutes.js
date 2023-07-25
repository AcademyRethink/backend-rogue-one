"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const inventoryController_1 = __importDefault(require("../controllers/inventoryController"));
const router = (0, express_1.Router)();
exports.router = router;
router.post('/', inventoryController_1.default.selectInventory);
router.post('/products', inventoryController_1.default.selectProducts);
