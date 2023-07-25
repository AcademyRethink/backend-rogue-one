"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notificationController_1 = __importDefault(require("../controllers/notificationController"));
const notifications = (0, express_1.Router)();
notifications.patch('/notifications/:id/viewed', notificationController_1.default.updateNotificationViewed);
notifications.get('/unresolved-notifications', notificationController_1.default.getUnresolvedNotifications);
exports.default = notifications;
