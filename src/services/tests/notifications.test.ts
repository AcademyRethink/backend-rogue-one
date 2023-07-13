import { describe, jest } from '@jest/globals';
import notificationRepository from '../../repositories/notificationRepository';
import notificationService from '../notificationsService';
import { Product } from '../../types/notificationType';

jest.mock('../../repositories/notificationRepository', () => ({
  getAllProducts: jest.fn(),
  saveNotification: jest.fn(),
  updateProductByEan: jest.fn(),
  getNotification: jest.fn(),
  updateNotificationViewed: jest.fn(),
  updateResolvedNotification: jest.fn(),
  getUnresolvedNotifications: jest.fn(),
}));
describe('notificationService', () => {

  describe('isLowQuantityProduct', () => {
    it('should return true for a low quantity product', () => {
      const mockProduct: Product = {
        id: 1,
        cnpj: '1234567890',
        product_name: 'Product A',
        ean: '9876543210',
        quantity: 5,
        min_quantity: 10,
        category: 'Category A',
        date: new Date(),
      };
      const result = notificationService.isLowQuantityProduct(mockProduct);
      expect(result).toBe(true);
    });
  
    it('should return false for a normal quantity product', () => {
      const mockProduct: Product = {
        id: 2,
        cnpj: '0987654321',
        product_name: 'Product B',
        ean: '0123456789',
        quantity: 15,
        min_quantity: 10,
        category: 'Category B',
        date: new Date(),
      };
      const result = notificationService.isLowQuantityProduct(mockProduct);
      expect(result).toBe(false);
    });
  });
  
  describe('getNotificationForProduct', () => {
    it('should return the first notification for the given product', async () => {
      const mockProduct: Product = {
        id: 1,
        cnpj: '1234567890',
        product_name: 'Product A',
        ean: '9876543210',
        quantity: 15,
        min_quantity: 10,
        category: 'Category A',
        date: new Date(),
      };

      const mockNotification = {
        notification_id: 1,
        message: 'Notification message',
      };

      jest.spyOn(notificationRepository, 'getNotification').mockResolvedValueOnce([mockNotification]);

      const result = await notificationService.getNotificationForProduct(mockProduct);

      expect(notificationRepository.getNotification).toHaveBeenCalledWith({
        ean: mockProduct.ean,
        viewed: false,
        resolved_notification: false,
      });
      expect(result).toEqual(mockNotification);
    });

    it('should return undefined if no notification exists', async () => {
      const mockProduct: Product = {
        id: 1,
        cnpj: '1234567890',
        product_name: 'Product A',
        ean: '9876543210',
        quantity: 15,
        min_quantity: 10,
        category: 'Category A',
        date: new Date(),
      };

      jest.spyOn(notificationRepository, 'getNotification').mockResolvedValueOnce([]);

      const result = await notificationService.getNotificationForProduct(mockProduct);

      expect(notificationRepository.getNotification).toHaveBeenCalledWith({
        ean: mockProduct.ean,
        viewed: false,
        resolved_notification: false,
      });
      expect(result).toBeUndefined();
    });
  });
 
  describe('saveNotification', () => {
    it('should save the notification and return the notification ID', async () => {
      const mockEan = '9876543210';
      const mockMessage = 'Notification message';
      const mockNotificationId = 1;
    
      jest.spyOn(notificationRepository, 'saveNotification').mockResolvedValueOnce([mockNotificationId]);
    
      const result = await notificationService.saveNotification(mockEan, mockMessage);
    
      expect(notificationRepository.saveNotification).toHaveBeenCalledWith(mockEan, mockMessage);
      expect(result).toEqual([mockNotificationId]);
    });
  
  });
 
  describe('updateNotificationViewed', () => {
    it('should update the viewed column for the given notification ID', async () => {
      const mockNotificationId = 1;

      await notificationService.updateNotificationViewed(mockNotificationId);

      expect(notificationRepository.updateNotificationViewed).toHaveBeenCalledWith(mockNotificationId);
    });
    
  });

  
  describe('getUnresolvedNotifications', () => {
    it('should return formatted unresolved notifications', async () => {
      const mockNotifications = [
        { notification_id: 1, message: 'Notification A, produto 1' },
        { notification_id: 2, message: 'Notification B, produto 2' },
      ];
      const mockFormattedNotifications = [
        { notification_id: 1, message: 'Notification A' },
        { notification_id: 2, message: 'Notification B' },
      ];

      jest.spyOn(notificationRepository, 'getUnresolvedNotifications').mockResolvedValueOnce(mockNotifications);

      const result = await notificationService.getUnresolvedNotifications();

      expect(notificationRepository.getUnresolvedNotifications).toHaveBeenCalled();
      expect(result).toEqual(mockFormattedNotifications);
    });
    it('should throw an error if getting unresolved notifications fails', async () => {
      const mockError = new Error('Error getting unresolved notifications');
      jest.spyOn(notificationRepository, 'getUnresolvedNotifications').mockRejectedValueOnce(mockError);

      await expect(notificationService.getUnresolvedNotifications()).rejects.toThrow(
        'Erro ao obter notificações não resolvidas: ' + mockError.message
      );
    });
  });
});
