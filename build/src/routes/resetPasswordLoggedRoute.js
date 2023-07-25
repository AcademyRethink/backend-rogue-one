"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const resetPasswordLoggedController_1 = __importDefault(require("../controllers/resetPasswordLoggedController"));
const router = (0, express_1.Router)();
router.post('/reset-password-logged', resetPasswordLoggedController_1.default.resetPasswordLogged);
exports.default = router;
