import { Response, Request } from 'express';
import reportService from '../services/reportService';

const selectAllProductsFromController = async (req: Request, res: Response) => {
  try {
    const productsMap = await reportService.selectAllProductsFromService();

    res.status(200).json(productsMap);
  } catch (error: unknown) {
    res.json(error);
  }
};

export default { selectAllProductsFromController };
