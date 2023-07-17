import { knex, Knex } from 'knex';
import config from '../../knexfile';
import { Product, FormatedProduct, ReportData } from '../types/report';

const knexInstance = knex(config);

const formatNumber = (text: string) => {
  return Math.round(
    parseFloat(text !== undefined ? text.replace(',', '.') : '0.00')
  );
};

export async function seed(knex: Knex): Promise<void> {
  const cnpj = '00111222000133';
  const date = new Date('2023-03-01T00:00:00');
  const reportData = await fetch(
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
          sale_competitors_month: formatNumber(product.sale_competitors_month),
          sale_pharmacy_month: formatNumber(product.sale_pharmacy_month),
          month_year: date
        };
      })
    );

  // Inserts seed entries
  await knex.batchInsert('report', reportData);
}
