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

/* const getNotificationByEan = (ean: string) => {
  return knexInstance('notifications').where({ ean, resolved_notification: false }).first();
};
 */

const saveNotification = async (ean: string, message: string) => {
    const createdAt = new Date();
    await knexInstance('notifications').insert({ ean, message,created_at: createdAt });
  };

  /* const resolveNotification = async (notificationId: number) => {
    await knexInstance('notifications').where({ id: notificationId }).update({ resolved_notification: true });
  };
   */

export default {
  getAllProducts,
  saveNotification,
  updateProductByEan
 /*  getNotificationByEan, */
 /*  resolveNotification */
};
