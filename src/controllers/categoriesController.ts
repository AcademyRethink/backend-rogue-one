import { NextFunction, Request, Response } from 'express';
import categoryService from '../services/categoryService';

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await categoryService.getAll();
    res.status(200).json(categories);
    next();
  } catch (error: any) {
    throw new Error(error);
  }
};

export default { index };
