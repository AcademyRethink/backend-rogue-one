export type Product = {
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

export type FormatedProduct = {
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

export type ReportData = {
  data: Product[];
};
