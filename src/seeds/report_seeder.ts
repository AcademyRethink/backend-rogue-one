import { knex, Knex } from 'knex';
import config from '../../knexfile';
import { Product, FormatedProduct, ReportData } from '../types/report';

const knexInstance = knex(config);

const formatIntNumber = (text: string) => {
  const result = Math.floor(
    parseFloat(
      text !== undefined && text != '-' ? text.replace(',', '.') : '0.00'
    )
  );
  return result > 10 ? result - 3 : result > 0 ? result + 1 : result;
};

const formatFloatNumber = (text: string) => {
  return parseFloat(
    text !== undefined && text != '-' ? text.replace(',', '.') : '0.00'
  );
};

export async function seed(knex: Knex): Promise<void> {
  const cnpj = '00111222000133';
  const date = new Date('2023-08-01T00:00:00');
  const reportData = await fetch(
    'https://v1.nocodeapi.com/mhid/google_sheets/ytpeJtVEfEvcAwBR?tabId=api-report'
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
          sale_competitors_month: formatIntNumber(
            product.sale_competitors_month
          ),
          sale_pharmacy_month: formatIntNumber(product.sale_pharmacy_month),
          competitors_unity_price: formatFloatNumber(
            product.competitors_unity_price
          ),
          month_year: date
        };
      })
    );

  // await knex('report').del().where('month_year', '=', '2023-08-01');

  // Inserts seed entries
  await knex.batchInsert('report', reportData);
}
