import { Socket } from 'socket.io';
import notificationRepository from '../repositories/notificationRepository';
import { Product } from '../types/notificationType';
import { makeError } from '../middlewares/errorHandler';

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
  const isLow  = product.quantity <= product.min_quantity;
  return isLow
};

const handleLowQuantityProduct = async (product: Product, socket: Socket) => {
  const notification = await getNotificationForProduct(product);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  
  if (!notification) {
    const message = `${product.product_name}, produto que está entre os mais vendidos no mercado de acordo com a última atualização, atingiu a quantidade mínima pré estabelecida em seu estoque`;
    const [{ notification_id }] = await saveNotification(product.ean, message, product.cnpj);
    socket.emit('productNotification', { notification_id, message });
  }
};

const handleNormalQuantityProduct = async (product: Product) => {
  const notification = await getNotificationForProduct(product);
  if (notification) {
    await updateResolvedNotification(notification.notification_id);
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

const saveNotification = async (ean: string, message: string, cnpj: string) => {
  return notificationRepository.saveNotification(ean, message, cnpj);
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
      const { notification_id, message, viewed } = notification;
      const endIndex = message.indexOf(', produto');
      const truncatedMessage = message.substring(0, endIndex);
      return { notification_id, message: truncatedMessage, viewed };
    });
    return formattedNotifications;
  } catch (error) {
    throw makeError({
      message:
        'Erro ao obter notificações não resolvidas: ' +
        (error as Error).message,
      status: 500
    });
  }
};

//Simulação da checagem do estoque
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
  getUnresolvedNotifications,
  isLowQuantityProduct,
  saveNotification,
  handleLowQuantityProduct,
  handleNormalQuantityProduct,
  getNotificationForProduct,
  updateResolvedNotification,
  checkProductQuantity
};
