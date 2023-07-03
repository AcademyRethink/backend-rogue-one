import reportRepository from '../repositories/reportRepository';

const selectProductsFromService = async ({
  limit = '100',
  orderSort = 'DESC',
  orderField = 'sale_competitors_month',
  category = '',
  period = ''
}) => {
  const whereQuery = reportRepository.whereConstructor({
    category,
    period
  });
  if (!whereQuery) {
    throw new Error('Insira um filtro para realizar a busca');
  }

  const orderQuery = reportRepository.orderConstructor({
    orderField: orderField,
    orderSort: orderSort
  });

  const limitAsNumber = parseInt(limit);

  const productsMap = await reportRepository.selectProductsFromRepository(
    whereQuery,
    orderQuery,
    limitAsNumber
  );

  if (productsMap.length === 0) {
    throw new Error('Produto não encontrado');
  }

  return productsMap;
};

export default { selectProductsFromService };
