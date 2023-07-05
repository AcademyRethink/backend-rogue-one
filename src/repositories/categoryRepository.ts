import knex from 'knex';
import config from '../../knexfile';

const knexInstance = knex(config);

const getCategories = async () => {
  return await knexInstance('report').select('category').distinct();
};

export default { getCategories };
