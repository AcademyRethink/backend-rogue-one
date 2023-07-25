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
const notificationsService_1 = __importDefault(require("../services/notificationsService"));
const updateNotificationViewed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id, 10);
    try {
        yield notificationsService_1.default.updateNotificationViewed(id);
        res.status(200).json({ success: true, message: 'Coluna "viewed" atualizada com sucesso' });
    }
    catch (error) {
        console.error('Erro ao atualizar a coluna "viewed" da notificação:', error);
        res.status(500).json({ success: false, message: 'Erro ao atualizar a coluna "viewed"' });
    }
});
const getUnresolvedNotifications = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notifications = yield notificationsService_1.default.getUnresolvedNotifications();
        // console.log(notifications)
        res.json(notifications);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.default = { updateNotificationViewed, getUnresolvedNotifications };
