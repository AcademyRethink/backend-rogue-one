import { Request, Response } from 'express';
import notificationService from '../services/notificationsService';

const updateNotificationViewed = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  
    try {
      await notificationService.updateNotificationViewed(id);
      res.status(200).json({ success: true, message: 'Coluna "viewed" atualizada com sucesso' });
    } catch (error) {
      console.error('Erro ao atualizar a coluna "viewed" da notificação:', error);
      res.status(500).json({ success: false, message: 'Erro ao atualizar a coluna "viewed"' });
    }
  };

  const getUnresolvedNotifications = async (_req: Request, res: Response) => {
    try {
      const notifications = await notificationService.getUnresolvedNotifications();
console.log(notifications)
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

export default {updateNotificationViewed, getUnresolvedNotifications};
