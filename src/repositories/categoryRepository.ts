import knex from 'knex';
import config from '../../knexfile';

const knexInstance = knex(config);

const getCategories = async ({ cnpj }: { cnpj: string }) => {
  return await knexInstance('report')
    .select('category')
    .distinct()
    .where({ cnpj });
};

export default { getCategories };
