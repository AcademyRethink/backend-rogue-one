import { NextFunction, Request, Response } from 'express';
import categoryService from '../services/categoryService';

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cnpj } = req.query;
    const categories = await categoryService.getAll({cnpj: cnpj?.toString()});
    res.status(200).json(categories);
  } catch (error) {
    res.json(error);
  }
};

export default { index };
