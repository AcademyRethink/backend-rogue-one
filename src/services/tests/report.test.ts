import { describe, jest } from '@jest/globals';
import reportService from '../reportService';

const cnpj = '00111222000133';
const limit = '5';
const orderSort = 'DESC';
const orderField = 'sale_competitors_month';
const category = 'MIP_MARCA';
const period = '2023-02-01';
const molecule = 'DIPIRONA SODICA';
const product_name = 'DIPIRONA SODICA MG GOTAS 500MG 20ML x 1 /ML';

describe('selectProductsFromService', () => {
  it('should return an array of 5 objects', async () => {
    const result = await reportService.selectProductsFromService({
      cnpj,
      limit,
      orderSort,
      orderField,
      category,
      period
    });

    expect(result.length).toBe(5);
  });
  it('should throw an error because whereQuery is empty', async () => {
    try {
      await reportService.selectProductsFromService({});
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
  it('should throw an error because product wasnt found', async () => {
    try {
      await reportService.selectProductsFromService({
        cnpj,
        limit,
        orderSort,
        orderField,
        category,
        period: '1900-02-01'
      });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});

describe('selectLaboratoryByProductFromService', () => {
  it('should return an array with length <= to 5 filtered by molecule', async () => {
    const result = await reportService.selectLaboratoryByProductFromService({
      cnpj,
      limit,
      category,
      period,
      molecule,
      product_name
    });

    expect(result.length).toBeLessThanOrEqual(5);
  });

  it('should return an array with length <= to 5 filtered by product_name', async () => {
    const result = await reportService.selectLaboratoryByProductFromService({
      cnpj,
      limit,
      category: 'MIP_GENERICO',
      period,
      molecule,
      product_name
    });

    expect(result.length).toBeLessThanOrEqual(5);
  });

  it('should return an error because laboratory wasnt found', async () => {
    try {
      await reportService.selectLaboratoryByProductFromService({
        cnpj,
        limit,
        category: 'MIP_GENERICO',
        period,
        molecule,
        product_name: 'test'
      });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
