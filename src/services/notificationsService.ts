import { Socket } from 'socket.io';
import notificationRepository from '../repositories/notificationRepository';
import { Product } from '../types/notificationType';

const checkProductQuantity = async (socket: Socket) => {
  try {
    const products = await notificationRepository.getAllProducts();
    for (const product of products) {
      if (isLowQuantityProduct(product)) {
        await handleLowQuantityProduct(product, socket);
      } else {
        await handleNormalQuantityProduct(product);
      }
    }
  } catch (error) {
    console.error('Erro ao verificar a quantidade mínima do produto:', error);
  }
};

const isLowQuantityProduct = (product: Product) => {
  return product.quantity <= product.min_quantity;
};

const handleLowQuantityProduct = async (product: Product, socket: Socket) => {
  const notification = await getNotificationForProduct(product);
  if (!notification) {
    const message = `${product.product_name}, produto que está entre os mais vendidos no mercado de acordo com a última atualização, atingiu a quantidade mínima pré estabelecida em seu estoque`;
    const [{ notification_id }] = await saveNotification(product.ean, message);
    socket.emit('productNotification', { notification_id, message });
  }
};

const handleNormalQuantityProduct = async (product: Product) => {
  const notification = await getNotificationForProduct(product);
  if (notification) {
    await updateResolvedNotification(notification.notification_id);
    console.log(
      `Atualizada a coluna "resolved_notification" para o produto com ean ${product.ean}`
    );
  }
};

const getNotificationForProduct = async (product: Product) => {
  const notification = await notificationRepository.getNotification({
    ean: product.ean,
    viewed: false,
    resolved_notification: false
  });
  return notification[0];
};

const saveNotification = async (ean: string, message: string) => {
  return notificationRepository.saveNotification(ean, message);
};

const updateResolvedNotification = async (notificationId: number) => {
  await notificationRepository.updateResolvedNotification(notificationId);
};

const updateNotificationViewed = async (notificationId: number) => {
  try {
    await notificationRepository.updateNotificationViewed(notificationId);
  } catch (error) {
    console.error('Erro ao atualizar a coluna "viewed" da notificação:', error);
    throw error;
  }
};

const getUnresolvedNotifications = async () => {
  try {
    const notifications =
      await notificationRepository.getUnresolvedNotifications();
    const formattedNotifications = notifications.map((notification) => {
      const { notification_id, message } = notification;
      const endIndex = message.indexOf(', produto');
      const truncatedMessage = message.substring(0, endIndex);
      return { notification_id, message: truncatedMessage };
    });
    return formattedNotifications;
  } catch (error) {
    throw new Error(
      'Erro ao obter notificações não resolvidas: ' + (error as Error).message
    );
  }
};

//Simulação da checagem do estoque, feita uma vez a cada minuto
const startProductQuantityCheck = (socket: Socket) => {
  const checkInterval = 10 * 1000;

  const checkProducts = async () => {
    await checkProductQuantity(socket);
    setTimeout(checkProducts, checkInterval);
  };

  checkProducts();
};

export default {
  startProductQuantityCheck,
  updateNotificationViewed,
  getUnresolvedNotifications
};
