import reportRepository from '../repositories/reportRepository';

const selectProductsFromService = async ({
  limit = '100',
  orderSort = 'DESC',
  orderField = 'sale_competitors_month',
  category = '',
  period = '',
  cnpj = ''
}) => {
  if (cnpj === '') {
    throw new Error('CNPJ é obrigatório');
  }
  const whereQuery = reportRepository.whereConstructor({
    category,
    period,
    cnpj
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
  product_name,
  cnpj
}: {
  limit: string | undefined;
  category: string | undefined;
  period: string | undefined;
  molecule: string | undefined;
  product_name: string | undefined;
  cnpj: string | undefined;
}) => {
  if (!cnpj) {
    throw new Error('CNPJ é obrigatório');
  }
  const whereQuery = category?.includes('GENERICO')
    ? reportRepository.whereConstructor({
        period,
        product_name,
        cnpj
      })
    : reportRepository.whereConstructor({
        period,
        molecule,
        cnpj
      });

  const limitAsNumber = parseInt(limit);

  const result = await reportRepository.selectLaboratoryByProductFromRepository(
    {
      limit: limitAsNumber,
      whereQuery: whereQuery
    }
  );

  if (result.length === 0) {
    throw new Error('Laboratorio não encontrado');
  }
  return result;
};

export default {
  selectProductsFromService,
  selectLaboratoryByProductFromService
};
