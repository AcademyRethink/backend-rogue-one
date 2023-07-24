import knex from 'knex';
import config from '../../knexfile';

const knexInstance = knex(config);

const selectInventoryAndReportBalance = async (
  cnpj: string,
  // startYear: number,
  // startMonth: number,
  // endYear: number,
  // endMonth: number,
  product_name?: string,
  limit?: number,
) => {
  return await knexInstance('inventory')
    .where('inventory.cnpj', cnpj)
    .modify((query) =>
      product_name
        ? query.whereILike('inventory.product_name', `%${product_name}%`)
        : query
    )
    .rightJoin('report', (query) =>
      query.on('report.product_name', '=', 'inventory.product_name')
    )
    .whereRaw(
      'inventory.date = report.month_year AND inventory.date IS NOT NULL OR inventory.date IS NULL'
    )
    // .where("report.month_year", "<=", `${endYear}-${endMonth}-01`)
    // .whereRaw("EXTRACT(YEAR FROM month_year) >= ? AND EXTRACT(YEAR FROM month_year) <= ?", [startYear, endYear])
    // .whereRaw("EXTRACT(MONTH FROM month_year) >= ? AND EXTRACT(MONTH FROM month_year) <= ?", [startMonth, endMonth])
    // .rightJoin('report', (query) =>
    //   query.on('report.month_year', '=', 'inventory.date')
    // )
    // .where('report.product_name', '=', 'inventory.product_name')
    .select('month_year')
    .sum({
      sum_competitors: 'sale_competitors_month',
      sum_pharmacy: 'sale_pharmacy_month',
      sum_quantity: 'quantity'
    })
    .groupBy('month_year')
    .orderBy('month_year', 'asc')
    .modify((query) => limit ? query.limit(limit) : query);
  // return await knexInstance("inventory")
};

export default { selectInventoryAndReportBalance };
