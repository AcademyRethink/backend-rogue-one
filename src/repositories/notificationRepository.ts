import knex from 'knex';
import config from '../../knexfile';
import { NotificationCondition } from '../types/notificationType';

const knexInstance = knex(config);

const getAllProducts = async () => {
 return await knexInstance('inventory').select('*').where({'date': '2023-07-01'}).andWhere('id', '<', 8400);
};

const updateProductByEan = async (quantity: number, ean: string) => {
  const createdAt = new Date();
  await knexInstance('notifications').insert({ ean, created_at: createdAt });
  const product: { product_name: string }[] = await knexInstance('inventory')
    .from('inventory')
    .update({ quantity })
    .where({ ean })
    .returning('product.product_name');
  return `O produto ${product[0].product_name} acaba de atingir a quantidade mínima estabelecida`;
};

const saveNotification = async (ean: string, message: string, cnpj:string) => {
  const createdAt = new Date();
  console.log('saveNotification')
  return await knexInstance('notifications')
    .insert({ ean, message, cnpj, created_at: createdAt})
    .returning('notification_id');
};

const getNotification = async (condition: NotificationCondition) => {
  const { ean, resolved_notification } = condition;

  const query = knexInstance('notifications')
    .select('*')
    .where({ ean: Number(ean) });

  if (resolved_notification != null) 
    query.andWhere({ resolved_notification: !!resolved_notification });
  

  const notifications = await query;
  return notifications;
};

const updateNotificationViewed = async (notification_id: number) => {
  await knexInstance('notifications')
    .update({ viewed: true })
    .where({ notification_id});
};

const updateResolvedNotification = async (notification_id: number) => {
  await knexInstance('notifications')
    .update({ resolved_notification: true })
    .where({ notification_id});
};

const getUnresolvedNotifications = async () => {
  const notifications = await knexInstance('notifications')
    .select('notification_id', 'message', 'viewed')
    .where('resolved_notification', false);

  return notifications;
};

export default {
  getAllProducts,
  saveNotification,
  updateProductByEan,
  getNotification,
  updateNotificationViewed,
  updateResolvedNotification,
  getUnresolvedNotifications
};
