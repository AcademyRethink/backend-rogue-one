"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const graphController_1 = __importDefault(require("../controllers/graphController"));
const router = (0, express_1.Router)();
exports.router = router;
router.post('/2/:limit', graphController_1.default.selectInventoryAndReportByPeriod);
