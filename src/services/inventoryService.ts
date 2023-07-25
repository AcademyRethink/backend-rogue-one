import { makeError } from '../middlewares/errorHandler';
import inventoryRepository from '../repositories/inventoryRepository';
import { InventoryRecord } from '../types/inventoryType';

export const selectInventory = async (
  cnpj: string,
  sortBy?: [string, 'asc' | 'desc'][],
  limit?: number,
  options?: Partial<{
    product_name: string;
    year: number;
    month: number;
    category: string;
  }>
) => {
  try {
    if (cnpj === '') throw makeError({ message: 'Invalid CNPJ', status: 400 });

    return await inventoryRepository.selectInventory(
      cnpj,
      sortBy,
      limit,
      options
    );
  } catch (error) {
    if (error instanceof Error)
      throw makeError({ message: error.message, status: 500 });
    throw makeError({ message: `Unexpected error. ${error}`, status: 500 });
  }
};
/**
 * selectProducts - Return the products name list based on user's CNPJ matching product_name (using like clause) if passed.
 * @param {string} cnpj - The user's CNPJ
 * @param {string} [product_name] - String containg the products name (case insensitive).
 * @returns {string[]}
 */
export const selectProducts = async (cnpj: string) => {
  try {
    if (cnpj === '') throw makeError({ message: 'Invalid CNPJ', status: 400 });

    return await inventoryRepository.selectProducts(cnpj);
  } catch (error) {
    if (error instanceof Error)
      throw makeError({ message: error.message, status: 500 });
    throw makeError({ message: `Unexpected error. ${error}`, status: 500 });
  }
};
