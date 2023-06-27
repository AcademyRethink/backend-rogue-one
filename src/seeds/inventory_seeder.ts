import { Knex } from 'knex';

type InventoryRow = {
  cnpj: string;
  category: string;
  ean: string;
  product_name: string;
  quantity: number;
  min_quantity: number;
};

function randomizeNumber(value: number) {
  const rate = 0.8; //Base rate for randomizing quantity based on value.
  const ceil = 50; //
  const randomRate = (Math.random() - 0.5) * rate;

  return Math.floor((value * (1 + randomRate)) % ceil);
}

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('inventory').truncate();

  const cnpjs: string[] = (await knex('report').select('cnpj')).map(
    ({ cnpj }) => cnpj
  );
  const uniqueCnpjs: string[] = [...new Set(cnpjs)];

  const request = await fetch(
    'https://v1.nocodeapi.com/delmo/google_sheets/qyqtfgOGTShTYIqq?tabId=report'
  );
  const json = await request.json();
  const data: any[] = json['data'];

  for (let i = 0; i < uniqueCnpjs.length; i++) {
    for (let j = 0; j < data.length; j++) {
      const { category, ean, product_name, sale_competitors_month } = data[j];
      const quantity = randomizeNumber(
        Number(sale_competitors_month.replace(',', '.'))
      );
      const min_quantity = Math.ceil(0.6 * quantity);

      if (!(min_quantity - quantity)) {
        continue;
      }

      await knex('inventory').insert({
        cnpj: uniqueCnpjs[i],
        category,
        ean,
        product_name,
        quantity: min_quantity - quantity ? quantity : quantity + 1,
        min_quantity
      });
    }
  }

}
