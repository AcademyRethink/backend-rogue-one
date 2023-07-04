import knex from 'knex';
import config from '../../knexfile';

const knexInstance = knex(config);

const whereConstructor = ({
  category,
  period,
  molecule,
  product_name,
  cnpj
}: {
  category?: string;
  period?: string;
  molecule?: string;
  product_name?: string;
  cnpj?: string;
}) => {
  const whereQuery = [];
  if (category) whereQuery.push(`category = '${category}'`);
  if (period) whereQuery.push(`month_year = '${period}'`);
  if (molecule) whereQuery.push(`molecule = '${molecule}'`);
  if (product_name) whereQuery.push(`product_name = '${product_name}'`);
  if (cnpj) whereQuery.push(`cnpj = '${cnpj}'`);
  return whereQuery.join(' AND ');
};

const orderConstructor = ({
  orderField,
  orderSort
}: {
  orderField: string;
  orderSort: string;
}) => {
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

const selectLaboratoryByProductFromRepository = async ({
  limit,
  whereQuery
}: {
  limit: number;
  whereQuery: string;
}) => {
  return await knexInstance('report')
    .select('laboratory', 'molecule', 'product_name', 'sale_competitors_month')
    .whereRaw(whereQuery)
    .orderBy('sale_competitors_month', 'desc')
    .limit(limit);
};

export default {
  whereConstructor,
  orderConstructor,
  selectProductsFromRepository,
  selectLaboratoryByProductFromRepository
};
