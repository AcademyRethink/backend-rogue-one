import { InventoryRecord } from '../types/inventoryType';
import { selectInventory } from './inventoryService';
import reportRepository from '../repositories/reportRepository';

type DateString = `${number}${number}${number}${number}-${number}${number}`;

/**
 * Return a object containing the data grouped by year and month based on the given period. (Graph 2)
 * @param cnpj User's CNPJ
 * @param from String like date in format "yyyy-mm" representing the start date period.
 * @param to String like date in format "yyyy-mm" representing the end date period.
 * @param limitByMonth Number of elements by month (default: 100)
 * @returns
 */
export const selectInventoryAndReportByPeriod = async (
  cnpj: string,
  from: DateString,
  to: DateString,
  product_name?: string
) => {
  const [startYear, startMonth] = from.split('-').map((s) => Number(s));
  const [endYear, endMonth] = to.split('-').map((s) => Number(s));

  const data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
    }[];
  } = {
    labels: [],
    datasets: [
      { label: 'Inventory', data: [] },
      { label: 'Competitors Sales', data: [] },
      { label: 'Sales', data: [] }
    ]
  };

  for (
    let index = startYear * 12 + startMonth - 1;
    index < endYear * 12 + endMonth;
    index++
  ) {
    const year = Math.floor(index / 12);
    const month = (index % 12) + 1; // 1-based (January = 1, February = 2)

    data.labels.push(
      new Date(year, month - 1).toLocaleString('en-US', {
        month: 'long'
      })
    );

    const inventoryData: InventoryRecord[] = await selectInventory(
      cnpj,
      undefined,
      undefined,
      {
        year,
        month,
        product_name
      }
    );

    data.datasets[0].data.push(
      inventoryData.reduce((sum, { quantity }) => (sum += quantity), 0)
    );

    const reportData = await reportRepository.selectProductsFromRepository(
      reportRepository.whereConstructor({
        cnpj: cnpj,
        product_name: product_name
      }) +
        ` AND EXTRACT(YEAR FROM month_year) = ${year} AND EXTRACT(MONTH FROM month_year) = ${month}`,
      reportRepository.orderConstructor({
        orderField: 'report_id',
        orderSort: 'ASC'
      }),
      Math.pow(10, 5)
    );

    data.datasets[2].data.push(
      reportData.reduce(
        (sum, { sale_pharmacy_month }) => (sum += sale_pharmacy_month),
        0
      )
    );
    data.datasets[1].data.push(
      reportData.reduce(
        (sum, { sale_competitors_month }) => (sum += sale_competitors_month),
        0
      )
    );
  }

  return data;
};
