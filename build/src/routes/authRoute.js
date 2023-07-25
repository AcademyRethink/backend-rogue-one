"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.post('/sign-up', authController_1.signUp);
router.post('/login', authController_1.login);
router.post('/forgot-password', authController_1.forgotPassword);
router.post('/reset-password', authController_1.resetPassword);
exports.default = router;
