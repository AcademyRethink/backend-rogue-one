import knex from 'knex';
import config from '../../knexfile';

const knexInstance = knex(config)

const getAllProducts = () => {
  return knexInstance('inventory').select('*').where('date', '2023-03-01' );
};

const updateProductByEan = async(quantity: number, ean: string) => {
  const createdAt = new Date();
  await knexInstance('notifications').insert({ ean,created_at: createdAt });
  const product:{product_name: string}[] = await knexInstance('inventory').from('inventory').update({quantity}).where({ean}).returning('product.product_name');
  return `O produto ${product[0].product_name} acaba de atingir a quantidade mínima estabelecida`
};


const saveNotification = async (ean: string, message: string) => {
    const createdAt = new Date();
    return knexInstance('notifications').insert({ ean, message,created_at: createdAt }).returning('notification_id');
  };

  const getNotification = async (condition: any) => {
    const { ean, resolved_notification } = condition;
  
    const query = knexInstance('notifications').select('*').where({ ean });
  
    if (resolved_notification != null) {
      query.andWhere({ resolved_notification: !!resolved_notification });
    }
  
    const notifications = await query;
    return notifications;
  }; 

const updateNotificationViewed = async (notification_id: any) => {
  try {
    await knexInstance('notifications').update({ viewed: true }).where({ notification_id })
  } catch (error) {
    console.error('Erro ao atualizar a coluna "viewed" da notificação:', error);
    throw error;
  }
};

const updateResolvedNotification = async (notification_id: any) => {
  try {
    await knexInstance('notifications').update({ resolved_notification: true }).where({ notification_id });
  } catch (error) {
    console.error('Erro ao atualizar a coluna "resolved_notification":', error);
    throw error;
  }
}

const getUnresolvedNotifications = async () => {
  const notifications = await knexInstance('notifications')
    .select('notification_id', 'message')
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
