import categoryRepository from '../repositories/categoryRepository';

const getAll = async () => {
  return await categoryRepository.getCategories();
};

export default { getAll };
