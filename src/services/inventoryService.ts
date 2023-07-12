import inventoryRepository from '../repositories/inventoryRepository';
import { InventoryRecord } from '../types/inventoryType';


/**
 * Get the inventory balance for the specif filtering if passed or totally otherwise.
 * @param cnpj User's CNPJ with no format . or -, just the numbers.
 * @param product_name (Optional) String containing the product name, completely or partially, for filtering (case insensitive).
 * @param year (Optional) Year in string form.
 * @param month (Optional) Month in string for (January = 1, February = 2, etc.)
 * @param category (Optional) Category string for filtering (case insensitive).
 * @returns {InventoryRecord[]}
 */
export const selectInventory = inventoryRepository.selectInventory;

/**
 * selectProducts - Return the products name list based on user's CNPJ matching product_name (using like clause) if passed.
 * @param {string} cnpj - The user's CNPJ
 * @param {string} [product_name] - String containg the products name (case insensitive).
 * @returns {string[]}
 */
export const selectProducts = inventoryRepository.selectProducts;
