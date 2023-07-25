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
const notificationRepository_1 = __importDefault(require("../repositories/notificationRepository"));
const checkProductQuantity = (socket) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield notificationRepository_1.default.getAllProducts();
        for (const product of products) {
            if (isLowQuantityProduct(product)) {
                yield handleLowQuantityProduct(product, socket);
            }
            else {
                yield handleNormalQuantityProduct(product);
            }
        }
    }
    catch (error) {
        console.error('Erro ao verificar a quantidade mínima do produto:', error);
    }
});
const isLowQuantityProduct = (product) => {
    return product.quantity <= product.min_quantity;
};
const handleLowQuantityProduct = (product, socket) => __awaiter(void 0, void 0, void 0, function* () {
    const notification = yield getNotificationForProduct(product);
    if (!notification) {
        const message = `${product.product_name}, produto que está entre os mais vendidos no mercado de acordo com a última atualização, atingiu a quantidade mínima pré estabelecida em seu estoque`;
        const [{ notification_id }] = yield saveNotification(product.ean, message);
        socket.emit('productNotification', { notification_id, message });
    }
});
const handleNormalQuantityProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const notification = yield getNotificationForProduct(product);
    if (notification) {
        yield updateResolvedNotification(notification.notification_id);
    }
});
const getNotificationForProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const notification = yield notificationRepository_1.default.getNotification({
        ean: product.ean,
        viewed: false,
        resolved_notification: false
    });
    return notification[0];
});
const saveNotification = (ean, message) => __awaiter(void 0, void 0, void 0, function* () {
    return notificationRepository_1.default.saveNotification(ean, message);
});
const updateResolvedNotification = (notificationId) => __awaiter(void 0, void 0, void 0, function* () {
    yield notificationRepository_1.default.updateResolvedNotification(notificationId);
});
const updateNotificationViewed = (notificationId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield notificationRepository_1.default.updateNotificationViewed(notificationId);
    }
    catch (error) {
        console.error('Erro ao atualizar a coluna "viewed" da notificação:', error);
        throw error;
    }
});
const getUnresolvedNotifications = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notifications = yield notificationRepository_1.default.getUnresolvedNotifications();
        const formattedNotifications = notifications.map((notification) => {
            const { notification_id, message, viewed } = notification;
            const endIndex = message.indexOf(', produto');
            const truncatedMessage = message.substring(0, endIndex);
            return { notification_id, message: truncatedMessage, viewed };
        });
        return formattedNotifications;
    }
    catch (error) {
        throw new Error('Erro ao obter notificações não resolvidas: ' + error.message);
    }
});
//Simulação da checagem do estoque, feita uma vez a cada minuto
const startProductQuantityCheck = (socket) => {
    const checkInterval = 10 * 1000;
    const checkProducts = () => __awaiter(void 0, void 0, void 0, function* () {
        yield checkProductQuantity(socket);
        setTimeout(checkProducts, checkInterval);
    });
    checkProducts();
};
exports.default = {
    startProductQuantityCheck,
    updateNotificationViewed,
    getUnresolvedNotifications,
    isLowQuantityProduct,
    saveNotification,
    handleLowQuantityProduct,
    handleNormalQuantityProduct,
    getNotificationForProduct,
    updateResolvedNotification,
    checkProductQuantity
};
