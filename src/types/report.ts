export type Product = {
  row_id: number;
  category: string;
  ean: string;
  molecule: string;
  laboratory: string;
  product_name: string;
  sale_competitors_month: string;
  sale_pharmacy_month: string;
  competitors_unity_price: string;
  month_year: string;
};

export type FormatedProduct = {
  cnpj: string;
  category: string;
  ean: string;
  molecule: string;
  laboratory: string;
  product_name: string;
  sale_competitors_month: number;
  sale_pharmacy_month: number;
  competitors_unity_price: number;
  month_year: Date;
};

export type ReportData = {
  data: Product[];
};
