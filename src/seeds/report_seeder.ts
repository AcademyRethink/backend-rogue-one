import { knex, Knex } from 'knex';
import config from '../../knexfile';

const knexInstance = knex(config);

type Product = {
  row_id: number;
  category: string;
  ean: string;
  molecule: string;
  laboratory: string;
  product_name: string;
  sale_competitors_month: string;
  sale_pharmacy_month: string;
  month_year: string;
};

type FormatedProduct = {
  cnpj: string;
  category: string;
  ean: string;
  molecule: string;
  laboratory: string;
  product_name: string;
  sale_competitors_month: number;
  sale_pharmacy_month: number;
  month_year: Date;
};
type ReportData = {
  data: Product[];
};

const formatNumber = (text: string) => {
  return Math.round(
    parseFloat(text !== undefined ? text.replace(',', '.') : '0.00')
  );
};

export async function seed(knex: Knex): Promise<void> {
  const cnpj = '00111222000133';
  const date = new Date('2023-03-01T00:00:00');
  const reportData: FormatedProduct[] = await fetch(
    'https://v1.nocodeapi.com/delmo/google_sheets/qyqtfgOGTShTYIqq?tabId=report'
  )
    .then((res) => res.json())
    .then((res: ReportData) => res.data)
    .then((data: Product[]): FormatedProduct[] =>
      data.map((product: Product): FormatedProduct => {
        return {
          cnpj: cnpj,
          category: product.category,
          ean: product.ean,
          molecule: product.molecule,
          laboratory: product.laboratory,
          product_name: product.product_name,
          sale_competitors_month:
            formatNumber(product.sale_competitors_month) !== 0
              ? formatNumber(product.sale_competitors_month) + 2
              : 0,
          sale_pharmacy_month:
            formatNumber(product.sale_pharmacy_month) !== 0
              ? formatNumber(product.sale_pharmacy_month) + 4
              : 0,
          month_year: date
        };
      })
    );

  // Inserts seed entries
  await knex.batchInsert('report', reportData);
}

seed(knexInstance);
