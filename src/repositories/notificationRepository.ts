import knex from 'knex';
import config from '../../knexfile';

const knexInstance = knex(config)

const getAllProducts = () => {
  return knexInstance('inventory').select('*');
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

const getNotification = async (ean: string) => {
  const notification = await knexInstance('notifications').select('*').where({ean, viewed: false});
  return notification
}; 

const updateNotificationViewed = async (notificationId: any) => {
  try {
    await knexInstance('notifications').where('notification_id', notificationId).update('viewed', true);
  } catch (error) {
    console.error('Erro ao atualizar a coluna "viewed" da notificação:', error);
    throw error;
  }
};

export default {
  getAllProducts,
  saveNotification,
  updateProductByEan,
  getNotification,
  updateNotificationViewed
};
