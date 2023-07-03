import type { InventoryRecord } from '../types/inventory';
import * as inventoryServices from './inventoryServices';

describe('selectInventory', async () => {
  it('should return a non-empty list for a valid CNPJ, or throw an error otherwise', async () => {
    const testValidCNPJ = '00111222000133';
    const testInvalidCNPJ = '111111111111111';

    const validData = await inventoryServices.selectInventory(testValidCNPJ);

    expect(validData.length).toBeGreaterThan(0);
    expect(
      await inventoryServices.selectInventory(testInvalidCNPJ)
    ).toThrowError();
  });

  it('should return a limited array if the limit argument is passed', async () => {
    const cnpj = '00111222000133';
    const limit = 10;
    const data = await inventoryServices.selectInventory(
      cnpj,
      undefined,
      limit
    );

    expect(data.length).toBe(limit);
  });
  it('should return a sorted array if the sortBy object is passed', async () => {
    const cnpj = '00111222000133';
    const column = 'product_name';
    const data = await inventoryServices.selectInventory(cnpj, [
      [column, 'asc']
    ]);

    expect(data[0][column].localeCompare(data[1][column])).toBeGreaterThan(0);
  });

  const option = {
    product_name: 'Ab',
    year: 2023,
    month: 1,
    category: 'GENERICO'
  };
  it('should return a list filtered by the option object', async () => {
    const cnpj = '00111222000133';

    const dataFilteredByProductName: InventoryRecord[] =
      await inventoryServices.selectInventory(cnpj, undefined, undefined, {
        product_name: option.product_name
      });
    expect(
      dataFilteredByProductName.filter(
        ({ product_name }) => !product_name.match(`/${option.product_name}/i`)
      ).length
    ).toBe(0);

    const dataFilteredByYear: InventoryRecord[] =
      await inventoryServices.selectInventory(cnpj, undefined, undefined, {
        year: option.year
      });
    expect(
      dataFilteredByYear.filter(({ date }) => date.getFullYear() != option.year)
        .length
    ).toBe(0);

    const dataFilteredByMonth: InventoryRecord[] =
      await inventoryServices.selectInventory(cnpj, undefined, undefined, {
        month: option.month
      });

    expect(
      dataFilteredByMonth.filter(({ date }) => date.getMonth() != option.month)
        .length
    ).toBe(0);

    const dataFilteredByCategory: InventoryRecord[] =
      await inventoryServices.selectInventory(cnpj, undefined, undefined, {
        category: option.category
      });
    expect(
      dataFilteredByCategory.filter(
        ({ category }) => !category.match(`/${category}/i`)
      ).length
    ).toBe(0);
  });
});

describe('selectProducts', async () => {
  it('should return an array of name of products', async () => {
    const cnpj = '00111222000133';
    const data = await inventoryServices.selectProducts(cnpj);

    expect(data.length).toBeGreaterThan(0);
  });
  it('should return an array of name of products filtered by product name substring', async () => {
    const cnpj = '00111222000133';
    const substring = 'abc';

    const data = await inventoryServices.selectProducts(cnpj, substring);
    expect(
      data.filter(({ product_name }) => !product_name.match(`/${substring}/i`))
        .length
    ).toBe(0);
  });
});
