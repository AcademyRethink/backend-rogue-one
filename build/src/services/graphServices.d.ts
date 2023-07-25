/**
 * Return a object containing the data grouped by year and month based on the given period. (Graph 2)
 * @param cnpj User's CNPJ
 * @param from String like date in format "yyyy-mm" representing the start date period.
 * @param to String like date in format "yyyy-mm" representing the end date period.
 * @param limitByMonth Number of elements by month (default: 100)
 * @returns
 */
export declare const selectInventoryAndReportByPeriod: (cnpj: string, product_name?: string, limit?: number, completeLabel?: boolean) => Promise<{
    labels: string[];
    datasets: {
        label: string;
        data: number[];
    }[];
}>;
