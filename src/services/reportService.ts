import reportRepository from '../repositories/reportRepository';
import { makeError } from '../middlewares/errorHandler';

const selectProductsFromService = async ({
  limit = '100',
  orderSort = 'DESC',
  orderField = 'sale_competitors_month',
  category = '',
  period = '',
  cnpj = ''
}) => {
  if (cnpj === '') {
    throw makeError({ message: 'CNPJ é obrigatório', status: 400 });
  }

  if (category === '' || period === '') {
    throw makeError({
      message: 'Categoria e período são obrigatórios para realizar a busca',
      status: 400
    });
  }
  const whereQuery = reportRepository.whereConstructor({
    category,
    period,
    cnpj
  });

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
    throw makeError({ message: 'Produto não encontrado', status: 404 });
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
    throw makeError({ message: 'CNPJ é obrigatório', status: 400 });
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
    throw makeError({ message: 'Laboratório não encontrado', status: 404 });
  }
  return result;
};

export default {
  selectProductsFromService,
  selectLaboratoryByProductFromService
};
