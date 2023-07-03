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

const selectLaboratoryByProductFromService = async ({
  limit = '5',
  category,
  period,
  molecule,
  product_name
}: {
  limit: string | undefined;
  category: string | undefined;
  period: string | undefined;
  molecule: string | undefined;
  product_name: string | undefined;
}) => {
  const whereQuery = category?.includes('GENERICO')
    ? reportRepository.whereConstructor({
        period,
        product_name
      })
    : reportRepository.whereConstructor({
        period,
        molecule
      });
  const limitAsNumber = parseInt(limit);
  return await reportRepository.selectLaboratoryByProductFromRepository({
    limit: limitAsNumber,
    whereQuery: whereQuery
  });
};

export default {
  selectProductsFromService,
  selectLaboratoryByProductFromService
};
