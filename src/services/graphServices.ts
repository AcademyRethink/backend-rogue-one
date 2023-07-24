import graphRepositories from '../repositories/graphRepositories';

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
  product_name?: string,
  limit?: number,
  completeLabel: boolean = false
) => {
  let data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
    }[];
  } = {
    labels: [],
    datasets: [
      { label: 'Estoque', data: [] },
      { label: 'Venda mercado', data: [] },
      { label: 'Minhas vendas', data: [] }
    ]
  };

  const rawData = await graphRepositories.selectInventoryAndReportBalance(
    cnpj,
    product_name,
    limit
  );

  data = rawData.reduce(
    (
      acc: {
        labels: string[];
        datasets: [
          { label: 'Estoque'; data: number[] },
          { label: 'Venda mercado'; data: number[] },
          { label: 'Minhas vendas'; data: number[] }
        ];
      },
      dataElement: {
        month_year: Date;
        sum_competitors: number;
        sum_pharmacy: number;
        sum_quantity: number;
      }
    ) => {
      acc.labels.push(
        (completeLabel ? dataElement.month_year.getFullYear() + ' | ' : '') +
          dataElement.month_year
            .toLocaleString('pt-BR', {
              month: 'long'
            })
            .split('')
            .map((char, index) => (!index ? char.toUpperCase() : char))
            .join('')
      );

      acc.datasets[0].data.push(dataElement.sum_quantity);
      acc.datasets[1].data.push(dataElement.sum_competitors);
      acc.datasets[2].data.push(dataElement.sum_pharmacy);

      return acc;
    },
    data
  );

  return data;
};
