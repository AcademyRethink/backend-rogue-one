import express from 'express';
import notificationController from '../controllers/notificationController';

const router = express.Router();

router.patch('/notifications/:id/viewed', notificationController.updateNotificationViewed);
router.get('/unresolved-notifications', notificationController.getUnresolvedNotifications);

export default router;
