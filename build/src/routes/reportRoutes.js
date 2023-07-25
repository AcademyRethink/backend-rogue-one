"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.laboratories = exports.report = void 0;
const express_1 = require("express");
const reportController_1 = __importDefault(require("../controllers/reportController"));
const report = (0, express_1.Router)();
exports.report = report;
const laboratories = (0, express_1.Router)();
exports.laboratories = laboratories;
report.get('/', reportController_1.default.selectProductsFromController);
report.get('/laboratories', reportController_1.default.selectLaboratoryByProductFromController);
report.get('/lastDate', reportController_1.default.getLastDate);
