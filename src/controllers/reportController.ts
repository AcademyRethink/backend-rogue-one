import { Response, Request } from 'express';
import reportService from '../services/reportService';

const selectProductsFromController = async (req: Request, res: Response) => {
  try {
    const { limit, orderSort, orderField, category, period } = req.query;
    const productsMap = await reportService.selectProductsFromService({
      limit: limit?.toString(),
      orderSort: orderSort?.toString(),
      orderField: orderField?.toString(),
      category: category?.toString(),
      period: period?.toString()
    });

    res.status(200).json(productsMap);
  } catch (error: unknown) {
    res.json(error);
  }
};

export default { selectProductsFromController };
