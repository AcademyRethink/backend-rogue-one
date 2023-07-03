import inventoryRepository from '../repositories/inventoryRepository';
import { InventoryRecord } from '../types/inventory';

type DateString = `${number}${number}${number}${number}-${number}${number}`;

export const selectInventory = inventoryRepository.selectInventory;

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
  let periodData: { year: number; month: number; data: number; id: string }[] =
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
