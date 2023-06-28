import knex from 'knex';
import config from '../../knexfile';

const knexInstance = knex(config);

const selectAllProducts = async () => {
  return await knexInstance('report').select('*');
};

export default { selectAllProducts };
