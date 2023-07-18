import { Response, Request } from 'express';
import * as inventoryServices from '../services/inventoryService';

const selectInventory = async (request: Request, response: Response) => {
  try {
    const { cnpj, sortBy, limit, options } = request.body;
    const inventoryData = await inventoryServices.selectInventory(
      cnpj,
      sortBy,
      limit,
      options
    );

    response.status(200).json(inventoryData);
  } catch (error: unknown) {
    response.json(error);
  }
};

const selectProducts = async (request: Request, response: Response) => {
  try {
    const { cnpj, product_name} = request.body;

    const data = await inventoryServices.selectProducts(
      cnpj,
      product_name,
    );
    response.status(200).json(data);
  } catch (error) {
    response.json(error);
  }
};



export default { selectInventory, selectProducts };
