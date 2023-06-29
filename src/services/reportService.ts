import reportRepository from '../repositories/reportRepository';

const selectProductsFromService = async ({
  limit = '100',
  orderSort = 'DESC',
  orderField = 'sale_competitors_month',
  category = '',
  period = ''
}) => {
  const whereQuery = reportRepository.whereConstructor({
    category: category,
    period: period
  });

  const orderQuery = reportRepository.orderConstructor({
    orderField: orderField,
    orderSort: orderSort
  });
  const limitAsNumber = typeof limit === 'string' ? parseInt(limit) : 100;
  return await reportRepository.selectProductsFromRepository(
    whereQuery,
    orderQuery,
    limitAsNumber
  );
};

export default { selectProductsFromService };
