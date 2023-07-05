import inventoryRepository from '../repositories/inventoryRepository';
import { InventoryRecord } from '../types/inventory';

type DateString = `${number}${number}${number}${number}-${number}${number}`;

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

/**
 * Return a object containing the data group by year and month based on the given period.
 * @param cnpj User's CNPJ
 * @param from String like date in format "yyyy-mm" representing the start date period.
 * @param to String like date in format "yyyy-mm" representing the end date period.
 * @param limitByMonth Number of elements by month (default: 100)
 * @returns
 */
export const selectInventoryByPeriod = async (
  cnpj: string,
  from: DateString,
  to: DateString,
  product_name?: string
) => {
  const [startYear, startMonth] = from.split('-').map((s) => Number(s));
  const [endYear, endMonth] = to.split('-').map((s) => Number(s));

  // const periodData: { [key: string]: { [key: string]: number } } = {};
  const periodData: { year: number; month: number; data: number; id: string }[] =
    [];

  for (
    let index = startYear * 12 + startMonth - 1;
    index < endYear * 12 + endMonth;
    index++
  ) {
    const year = Math.floor(index / 12);
    const month = (index % 12) + 1; // 1-based (January = 1, February = 2)
    const data: InventoryRecord[] = await selectInventory(
      cnpj,
      undefined,
      undefined,
      {
        year,
        month,
        product_name
      }
    );

    periodData.push({
      year,
      month,
      id: 'Inventory',
      data: data.reduce((acc, row) => (acc += row.quantity), 0)
    });
    // periodData[`${year}`] = { ...periodData[`${year}`], [`${month}`]: sum };
  }

  return periodData;
};
