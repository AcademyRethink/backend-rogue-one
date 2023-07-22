import { Router } from 'express';
import notificationController from '../controllers/notificationController';

const notifications: Router = Router();

notifications.patch('/notifications/:id/viewed', notificationController.updateNotificationViewed);
notifications.get('/unresolved-notifications', notificationController.getUnresolvedNotifications);

export default notifications;
