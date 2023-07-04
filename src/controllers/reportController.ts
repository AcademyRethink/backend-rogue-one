import { Response, Request } from 'express';
import reportService from '../services/reportService';

const selectProductsFromController = async (req: Request, res: Response) => {
  try {
    const { cnpj, limit, orderSort, orderField, category, period } = req.query;
    const productsList = await reportService.selectProductsFromService({
      cnpj: cnpj?.toString(),
      limit: limit?.toString(),
      orderSort: orderSort?.toString(),
      orderField: orderField?.toString(),
      category: category?.toString(),
      period: period?.toString()
    });

    res.status(200).json(productsList);
  } catch (error: unknown) {
    console.log(error);
    res.json(error);
  }
};

const selectLaboratoryByProductFromController = async (
  req: Request,
  res: Response
) => {
  try {
    const { cnpj, limit, category, period, molecule, product_name } = req.query;
    const laboratoryList =
      await reportService.selectLaboratoryByProductFromService({
        cnpj: cnpj?.toString(),
        limit: limit?.toString(),
        category: category?.toString(),
        period: period?.toString(),
        molecule: molecule?.toString(),
        product_name: product_name?.toString()
      });

    res.status(200).json(laboratoryList);
  } catch (error: unknown) {
    res.json(error);
  }
};

export default {
  selectProductsFromController,
  selectLaboratoryByProductFromController
};
