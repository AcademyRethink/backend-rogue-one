import { Socket } from 'socket.io';
import { Product } from '../types/notificationType';
declare const _default: {
    startProductQuantityCheck: (socket: Socket<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any>) => void;
    updateNotificationViewed: (notificationId: number) => Promise<void>;
    getUnresolvedNotifications: () => Promise<{
        notification_id: any;
        message: any;
        viewed: any;
    }[]>;
    isLowQuantityProduct: (product: Product) => boolean;
    saveNotification: (ean: string, message: string) => Promise<any[]>;
    handleLowQuantityProduct: (product: Product, socket: Socket<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any>) => Promise<void>;
    handleNormalQuantityProduct: (product: Product) => Promise<void>;
    getNotificationForProduct: (product: Product) => Promise<any>;
    updateResolvedNotification: (notificationId: number) => Promise<void>;
    checkProductQuantity: (socket: Socket<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any>) => Promise<void>;
};
export default _default;
