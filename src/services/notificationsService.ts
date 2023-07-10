import { Socket } from 'socket.io';
import notificationRepository from '../repositories/notificationRepository';

const checkProductQuantity = async (socket: Socket) => {
  try {
    const products = await notificationRepository.getAllProducts();

    for (const product of products){
      if (product.quantity <= product.min_quantity) {
        const notification = await notificationRepository.getNotification(product.ean)
        console.log(product.ean)
        console.log(notification)
        if(!notification.length){
          const message = ` ${product.product_name}, produto que está entre os mais vendidos no mercado de acordo com a ultima atualização, atingiu a quantidade mínima pré estabelecida em seu estoque`;
          console.log(message);
  
          const notification_id = await notificationRepository.saveNotification(product.ean, message);

          socket.emit('productNotification', { notification_id, message });
        }

      }
    };
  } catch (error) {
    console.log(error);
    console.error('Erro ao verificar a quantidade mínima do produto:', error);
  }
};
const startProductQuantityCheck = (socket: Socket) => {
  const checkInterval = 60 * 1000;

  const checkProducts = async () => {
    await checkProductQuantity(socket);
    setTimeout(checkProducts, checkInterval);
  };

  checkProducts();
};

const updateNotificationViewed = async (notificationId: any) => {
  try {
    await notificationRepository.updateNotificationViewed(notificationId);
  } catch (error) {
    console.error('Erro ao atualizar a coluna "viewed" da notificação:', error);
    throw error;
  }
};

export default {
  startProductQuantityCheck,
  updateNotificationViewed
};
