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
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("../../knexfile"));
const knexInstance = (0, knex_1.default)(knexfile_1.default);
const getAllProducts = () => {
    return knexInstance('inventory').select('*').where('date', '2023-03-01');
};
const updateProductByEan = (quantity, ean) => __awaiter(void 0, void 0, void 0, function* () {
    const createdAt = new Date();
    yield knexInstance('notifications').insert({ ean, created_at: createdAt });
    const product = yield knexInstance('inventory')
        .from('inventory')
        .update({ quantity })
        .where({ ean })
        .returning('product.product_name');
    return `O produto ${product[0].product_name} acaba de atingir a quantidade mínima estabelecida`;
});
const saveNotification = (ean, message) => __awaiter(void 0, void 0, void 0, function* () {
    const createdAt = new Date();
    return knexInstance('notifications')
        .insert({ ean, message, created_at: createdAt })
        .returning('notification_id');
});
const getNotification = (condition) => __awaiter(void 0, void 0, void 0, function* () {
    const { ean, resolved_notification } = condition;
    const query = knexInstance('notifications')
        .select('*')
        .where({ ean: Number(ean) });
    if (resolved_notification != null) {
        query.andWhere({ resolved_notification: !!resolved_notification });
    }
    const notifications = yield query;
    return notifications;
});
const updateNotificationViewed = (notification_id) => __awaiter(void 0, void 0, void 0, function* () {
    yield knexInstance('notifications')
        .update({ viewed: true })
        .where({ notification_id });
});
const updateResolvedNotification = (notification_id) => __awaiter(void 0, void 0, void 0, function* () {
    yield knexInstance('notifications')
        .update({ resolved_notification: true })
        .where({ notification_id });
});
const getUnresolvedNotifications = () => __awaiter(void 0, void 0, void 0, function* () {
    const notifications = yield knexInstance('notifications')
        .select('notification_id', 'message', 'viewed')
        .where('resolved_notification', false);
    return notifications;
});
exports.default = {
    getAllProducts,
    saveNotification,
    updateProductByEan,
    getNotification,
    updateNotificationViewed,
    updateResolvedNotification,
    getUnresolvedNotifications
};
