import { Response, Request } from 'express';
import reportService from '../services/reportService';

const selectProductsFromController = async (req: Request, res: Response) => {
  try {
    const { limit, orderSort, orderField, category, period } = req.query;
    const productsList = await reportService.selectProductsFromService({
      limit: limit?.toString(),
      orderSort: orderSort?.toString(),
      orderField: orderField?.toString(),
      category: category?.toString(),
      period: period?.toString()
    });

    res.status(200).json(productsList);
  } catch (error: unknown) {
    res.json(error);
  }
};

const selectLaboratoryByProductFromController = async (
  req: Request,
  res: Response
) => {
  try {
    const { limit, category, period, molecule, product_name } = req.query;
    const laboratoryList =
      await reportService.selectLaboratoryByProductFromService({
        limit: limit?.toString(),
        category: category?.toString(),
        period: period?.toString(),
        molecule: molecule?.toString(),
        product_name: product_name?.toString()
      });

    res.status(200).json(laboratoryList);
  } catch (error) {
    res.json(error);
  }
};

export default {
  selectProductsFromController,
  selectLaboratoryByProductFromController
};
