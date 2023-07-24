import knex from 'knex';
import config from '../../knexfile';

const knexInstance = knex(config);

const selectInventoryAndReportBalance = async (
  cnpj: string,
  product_name?: string,
  limit?: number
) => {
  return await knexInstance('inventory')
    .where('inventory.cnpj', cnpj)
    .modify((query) =>
      product_name
        ? query.whereILike('inventory.product_name', `%${product_name}%`)
        : query
    )
    .join('report', (query) =>
      query
        .on('report.product_name', '=', 'inventory.product_name')
        .andOn("inventory.cnpj", "=", "report.cnpj")
        .andOn('report.ean', '=', 'inventory.ean')
    )
    .whereRaw(
      'inventory.date = report.month_year AND inventory.date IS NOT NULL OR inventory.date IS NULL'
    )
    .select('month_year')
    .sum({
      sum_competitors: 'sale_competitors_month',
      sum_pharmacy: 'sale_pharmacy_month',
      sum_quantity: 'quantity'
    })
    .groupBy('month_year')
    .orderBy('month_year', 'asc')
    .modify((query) => (limit ? query.limit(limit) : query));
};


export default { selectInventoryAndReportBalance };
