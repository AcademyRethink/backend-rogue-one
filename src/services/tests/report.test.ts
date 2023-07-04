import { describe, jest } from '@jest/globals';
import reportRepository from '../../repositories/reportRepository';
import reportService from '../reportService';

const limit = '5';
const orderSort = 'DESC';
const orderField = 'sale_competitors_month';
const category = 'MIP_MARCA';
const period = '2023-02-01';
const molecule = 'DIPIRONA SODICA';
const product_name = 'DIPIRONA SODICA MG GOTAS 500MG 20ML x 1 /ML';

const productListMock = [
  {
    report_id: 92225,
    cnpj: '00111222000133',
    molecule: 'CAFEINA| DIPIRONA SODICA| ORFENADRINA CITRATO',
    laboratory: 'SANOFI',
    ean: '7891058017507',
    product_name: 'DORFLEX CPR x 36',
    category: 'MIP_MARCA',
    sale_pharmacy_month: 0,
    sale_competitors_month: 31,
    month_year: new Date('2023-02-01T03:00:00.000Z')
  },
  {
    report_id: 92226,
    cnpj: '00111222000133',
    molecule:
      'CANFORA| EUCALYPTUS GLOBULUS| MENTOL| MYRISTICA FRAGANS| OLEO DE EUCALIPTO| TEREBINTINA',
    laboratory: 'P&G HEALTH',
    ean: '78911222',
    product_name: 'VICK VAPORUB POMADA 12G x 1',
    category: 'MIP_MARCA',
    sale_pharmacy_month: 0,
    sale_competitors_month: 14,
    month_year: new Date('2023-02-01T03:00:00.000Z')
  },
  {
    report_id: 92227,
    cnpj: '00111222000133',
    molecule: 'DIPIRONA SODICA| ESCOPOLAMINA BUTILBROMETO',
    laboratory: 'HYPERA CH',
    ean: '7896094921399',
    product_name: 'BUSCOPAN COMPOSTO CPR REVEST x 20',
    category: 'MIP_MARCA',
    sale_pharmacy_month: 4,
    sale_competitors_month: 12,
    month_year: new Date('2023-02-01T03:00:00.000Z')
  },
  {
    report_id: 92228,
    cnpj: '00111222000133',
    molecule: 'DIPIRONA SODICA',
    laboratory: 'SANOFI',
    ean: '7891058001155',
    product_name: 'NOVALGINA CPR 1.00G x 10',
    category: 'MIP_MARCA',
    sale_pharmacy_month: 1,
    sale_competitors_month: 8,
    month_year: new Date('2023-02-01T03:00:00.000Z')
  },
  {
    report_id: 92229,
    cnpj: '00111222000133',
    molecule: 'DIPIRONA SODICA',
    laboratory: 'HYPERA CH',
    ean: '7896094915381',
    product_name: 'ATROVERAN DIP CPR 1.00G x 20',
    category: 'MIP_MARCA',
    sale_pharmacy_month: 0,
    sale_competitors_month: 6,
    month_year: new Date('2023-02-01T03:00:00.000Z')
  }
];

describe('selectProductsFromService', () => {
  it('should return an array of 5 objects', async () => {
    const result = await reportService.selectProductsFromService({
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
      const result = await reportService.selectLaboratoryByProductFromService({
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
