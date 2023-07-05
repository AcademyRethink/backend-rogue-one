import { Socket } from 'socket.io';
import notificationRepository from '../repositories/notificationRepository';

const checkProductQuantity = async (socket: Socket) => {
  try {
    const products = await notificationRepository.getAllProducts();
    

    products.forEach(async (product) => {
       /* const notification = await notificationRepository.getNotificationByEan(product.ean);
       console.log(notification) */
     
      if (product.quantity <= product.min_quantity) {
        /* if (!notification) */ {
          const message = `O produto ${product.product_name} acaba de atingir a quantidade mínima estabelecida`;
          console.log(message);

          socket.emit('productNotification', { ean: product.ean, message });

         /*  await notificationRepository.saveNotification(product.ean, message); */
        }
      }  /* else {
        if (notification) {
          await notificationRepository.resolveNotification(notification.id);
        }
      } */ 
    });
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

export default {
  startProductQuantityCheck
};