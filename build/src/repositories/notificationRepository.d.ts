import { NotificationCondition } from '../types/notificationType';
declare const _default: {
    getAllProducts: () => import("knex").Knex.QueryBuilder<any, {
        _base: any;
        _hasSelection: false;
        _keys: string;
        _aliases: {};
        _single: false;
        _intersectProps: {};
        _unionProps: never;
    }[]>;
    saveNotification: (ean: string, message: string) => Promise<any[]>;
    updateProductByEan: (quantity: number, ean: string) => Promise<string>;
    getNotification: (condition: NotificationCondition) => Promise<any[]>;
    updateNotificationViewed: (notification_id: number) => Promise<void>;
    updateResolvedNotification: (notification_id: number) => Promise<void>;
    getUnresolvedNotifications: () => Promise<any[]>;
};
export default _default;
