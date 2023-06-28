import reportRepository from '../repositories/reportRepository';

const mockedProducts = [
  {
    report_id: 91983,
    cnpj: '00111222000133',
    molecule: 'DIPIRONA SODICA',
    laboratory: 'NEO QUIMICA',
    ean: '7896714213736',
    product_name: 'DIPIRONA SODICA MG GOTAS 500MG 20ML x 1 /ML',
    category: 'MIP_GENERICO',
    sale_pharmacy_month: 24,
    sale_competitors_month: 86,
    month_year: '2023-02-01T03:00:00.000Z'
  },
  {
    report_id: 91984,
    cnpj: '00111222000133',
    molecule: 'DIPIRONA SODICA',
    laboratory: 'GERMED PHARMA',
    ean: '7896004719115',
    product_name: 'DIPIRONA SODICA MG GOTAS 500MG 10ML x 1 /ML',
    category: 'MIP_GENERICO',
    sale_pharmacy_month: 0,
    sale_competitors_month: 14,
    month_year: '2023-02-01T03:00:00.000Z'
  },
  {
    report_id: 91985,
    cnpj: '00111222000133',
    molecule: 'NISTATINA| ZINCO SULFATO',
    laboratory: 'NEO QUIMICA',
    ean: '7896714224688',
    product_name: 'NIST+OXID.ZINCO MG POMADA 60G x 1',
    category: 'MIP_GENERICO',
    sale_pharmacy_month: 10,
    sale_competitors_month: 11,
    month_year: '2023-02-01T03:00:00.000Z'
  },
  {
    report_id: 91986,
    cnpj: '00111222000133',
    molecule: 'DIPIRONA SODICA',
    laboratory: 'NEO QUIMICA',
    ean: '7896714207551',
    product_name: 'DIPIRONA SODICA MG CPR 1.00G x 10',
    category: 'MIP_GENERICO',
    sale_pharmacy_month: 6,
    sale_competitors_month: 7,
    month_year: '2023-02-01T03:00:00.000Z'
  },
  {
    report_id: 91987,
    cnpj: '00111222000133',
    molecule: 'PARACETAMOL',
    laboratory: 'UNIAO QUIMICA F N',
    ean: '7896006281764',
    product_name: 'PARACETAMOL MG CPR 750MG x 20',
    category: 'MIP_GENERICO',
    sale_pharmacy_month: 0,
    sale_competitors_month: 6,
    month_year: '2023-02-01T03:00:00.000Z'
  },
  {
    report_id: 105236,
    cnpj: '00111222000133',
    molecule: 'DESOGESTREL',
    laboratory: 'NEO QUIMICA',
    ean: '7896714255026',
    product_name: 'DESOGESTREL MG CPR REVEST 75.0Y x 84',
    category: 'RX_GENERICO',
    sale_pharmacy_month: 0,
    sale_competitors_month: 0,
    month_year: '2023-03-01T03:00:00.000Z'
  },
  {
    report_id: 105237,
    cnpj: '00111222000133',
    molecule: 'TADALAFILA',
    laboratory: 'NEO QUIMICA',
    ean: '7896714255903',
    product_name: 'TADALAFILA MG CPR REVEST 20mg x 4',
    category: 'RX_GENERICO',
    sale_pharmacy_month: 0,
    sale_competitors_month: 0,
    month_year: '2023-03-01T03:00:00.000Z'
  },
  {
    report_id: 105238,
    cnpj: '00111222000133',
    molecule: 'TETRACICLINA',
    laboratory: 'MEDQUIMICA',
    ean: '7896862918057',
    product_name: 'CLOR.TETRACICLI.MG CAPSULAS 500MG x 80',
    category: 'RX_GENERICO',
    sale_pharmacy_month: 0,
    sale_competitors_month: 0,
    month_year: '2023-03-01T03:00:00.000Z'
  },
  {
    report_id: 105239,
    cnpj: '00111222000133',
    molecule: 'ACECLOFENACO',
    laboratory: 'RANBAXY',
    ean: '7897076909312',
    product_name: 'ACECLOFENACO MG CPR REVEST 100MG x 12',
    category: 'RX_GENERICO',
    sale_pharmacy_month: 0,
    sale_competitors_month: 0,
    month_year: '2023-03-01T03:00:00.000Z'
  },
  {
    report_id: 105240,
    cnpj: '00111222000133',
    molecule: 'ESCITALOPRAM OXALATO',
    laboratory: 'RANBAXY',
    ean: '7897076919106',
    product_name: 'OX ESCITALOPRAM MG CPR REVEST 20mg x 30',
    category: 'RX_GENERICO',
    sale_pharmacy_month: 0,
    sale_competitors_month: 0,
    month_year: '2023-03-01T03:00:00.000Z'
  },
  {
    report_id: 105241,
    cnpj: '00111222000133',
    molecule: 'TAMOXIFENO CITRATO',
    laboratory: 'SANDOZ DO BRASIL',
    ean: '7897595601889',
    product_name: 'CITR.TAMOXIFENO MG CPR REVEST 10mg x 30',
    category: 'RX_GENERICO',
    sale_pharmacy_month: 0,
    sale_competitors_month: 0,
    month_year: '2023-03-01T03:00:00.000Z'
  },
  {
    report_id: 82135,
    cnpj: '00111222000133',
    molecule: 'PARACETAMOL',
    laboratory: 'MEDQUIMICA',
    ean: '7896862918156',
    product_name: 'PARACETAMOL MG CPR 20X10 750MG x 200',
    category: 'MIP_GENERICO',
    sale_pharmacy_month: 0,
    sale_competitors_month: 0,
    month_year: '2023-01-01T03:00:00.000Z'
  },
  {
    report_id: 82136,
    cnpj: '00111222000133',
    molecule: 'DIMETICONA',
    laboratory: 'MEDQUIMICA',
    ean: '7896862970802',
    product_name: 'SIMETICONA MG CAPS GEL 125MG x 10',
    category: 'MIP_GENERICO',
    sale_pharmacy_month: 1,
    sale_competitors_month: 0,
    month_year: '2023-01-01T03:00:00.000Z'
  },
  {
    report_id: 82137,
    cnpj: '00111222000133',
    molecule: 'CETOCONAZOL',
    laboratory: 'GLOBO',
    ean: '7898060132549',
    product_name: 'CETOCONAZOL MG SHAMPOO 20mg 100ML x 1 /ML',
    category: 'MIP_GENERICO',
    sale_pharmacy_month: 0,
    sale_competitors_month: 0,
    month_year: '2023-01-01T03:00:00.000Z'
  }
];

const selectAllProductsFromService = async () => {
  const result = await reportRepository.selectAllProducts();
  const groupedBy = result.reduce((acc: { [key: string]: any }, el) => {
    const key = el['category'];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(el);
    return acc;
  }, {});
  return groupedBy;
};

export default { selectAllProductsFromService };
