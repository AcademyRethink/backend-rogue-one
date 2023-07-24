import { makeError } from '../middlewares/errorHandler';
import categoryRepository from '../repositories/categoryRepository';

const getAll = async ({ cnpj }: { cnpj: string | undefined }) => {
  if (cnpj?.trim() === '' || cnpj === undefined) {
    throw makeError({ message: 'CNPJ é obrigatório', status: 400 });
  }
  return await categoryRepository.getCategories({cnpj});
};

export default { getAll };
