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
    if (cnpj === '') throw new Error('Invalid CNPJ');

    return await inventoryRepository.selectInventory(
      cnpj,
      sortBy,
      limit,
      options
    );
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error(`Unexpected error. ${error}`);
  }
};
/**
 * selectProducts - Return the products name list based on user's CNPJ matching product_name (using like clause) if passed.
 * @param {string} cnpj - The user's CNPJ
 * @param {string} [product_name] - String containg the products name (case insensitive).
 * @returns {string[]}
 */
export const selectProducts = async (cnpj: string, product_name?: string) => {
  try {
    if (cnpj === '') throw new Error('Invalid CNPJ');

    return await inventoryRepository.selectProducts(cnpj, product_name);
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error(`Unexpected error. ${error}`);
  }
};
