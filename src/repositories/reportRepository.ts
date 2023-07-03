import knex from 'knex';
import config from '../../knexfile';

const knexInstance = knex(config);

const whereConstructor = ({category, period}: {category: string, period: string}) => {
  const whereQuery = [];
  if (category) whereQuery.push(`category = '${category}'`);
  if (period) whereQuery.push(`month_year = '${period}'`);
  return whereQuery.join(' AND ');
};

const orderConstructor = ({
  orderField,
  orderSort
}: {orderField: string, orderSort: string}) => {
  return `${orderField} ${orderSort}`;
};

const selectProductsFromRepository = async (
  whereQuery: string,
  orderQuery: string,
  limit: number
) => {
  return await knexInstance('report')
    .select('*')
    .whereRaw(whereQuery)
    .orderByRaw(orderQuery)
    .limit(limit);
};

export default {
  whereConstructor,
  orderConstructor,
  selectProductsFromRepository
};
