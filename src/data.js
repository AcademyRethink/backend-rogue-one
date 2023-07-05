const filteredProduct = [
  {
    id: 1,
    cnpj: '00111222000133',
    product_name: 'DIPIRONA SODICA MG GOTAS 500MG 20ML x 1 /ML',
    ean: '7896714213736',
    quantity: 15,
    min_quantity: 12,
    category: 'MIP_GENERICO'
  },
  {
    id: 2,
    cnpj: '00111222000133',
    product_name: 'DIPIRONA SODICA MG GOTAS 500MG 20ML x 1 /ML',
    ean: '7896714213736',
    quantity: 29,
    min_quantity: 18,
    category: 'MIP_GENERICO'
  },
  {
    id: 3,
    cnpj: '00111222000133',
    product_name: 'DIPIRONA SODICA MG GOTAS 500MG 20ML x 1 /ML',
    ean: '7896714213736',
    quantity: 34,
    min_quantity: 21,
    category: 'MIP_GENERICO'
  },
  {
    id: 4,
    cnpj: '00111222000133',
    product_name: 'DIPIRONA SODICA MG GOTAS 500MG 10ML x 1 /ML',
    ean: '7896004719115',
    quantity: 11,
    min_quantity: 7,
    category: 'MIP_GENERICO'
  },
  {
    id: 5,
    cnpj: '00111222000133',
    product_name: 'DIPIRONA SODICA MG GOTAS 500MG 10ML x 1 /ML',
    ean: '7896004719115',
    quantity: 10,
    min_quantity: 6,
    category: 'MIP_GENERICO'
  },
  {
    id: 6,
    cnpj: '00111222000133',
    product_name: 'DIPIRONA SODICA MG GOTAS 500MG 10ML x 1 /ML',
    ean: '7896004719115',
    quantity: 16,
    min_quantity: 10,
    category: 'MIP_GENERICO'
  },
  {
    id: 7,
    cnpj: '00111222000133',
    product_name: 'NIST+OXID.ZINCO MG POMADA 60G x 1',
    ean: '7896714224688',
    quantity: 11,
    min_quantity: 7,
    category: 'MIP_GENERICO'
  },
  {
    id: 8,
    cnpj: '00111222000133',
    product_name: 'NIST+OXID.ZINCO MG POMADA 60G x 1',
    ean: '7896714224688',
    quantity: 8,
    min_quantity: 5,
    category: 'MIP_GENERICO'
  },
  {
    id: 9,
    cnpj: '00111222000133',
    product_name: 'NIST+OXID.ZINCO MG POMADA 60G x 1',
    ean: '7896714224688',
    quantity: 13,
    min_quantity: 8,
    category: 'MIP_GENERICO'
  },
  {
    id: 10,
    cnpj: '00111222000133',
    product_name: 'DIPIRONA SODICA MG CPR 1.00G x 10',
    ean: '7896714207551',
    quantity: 4,
    min_quantity: 3,
    category: 'MIP_GENERICO'
  }
];

const notifications = [{ product_id: 2, msg: 'teste' }];

const notificationExists = filteredProduct.filter(
  (product) => !notifications.includes((note) => product.id === note.product_id)
);
console.log({ notificationExists });
