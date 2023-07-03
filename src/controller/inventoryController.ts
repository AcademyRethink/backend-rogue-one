import { Response, Request } from 'express';
import * as inventoryServices from '../services/inventoryServices';

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

const selectInventoryByPeriod = async (
  request: Request,
  response: Response
) => {
  try {
    const { cnpj, from, to, product_name } = request.body;

    const inventoryData = await inventoryServices.selectInventoryByPeriod(
      cnpj,
      from,
      to,
      product_name
    );

    response.status(200).json(inventoryData);
  } catch (error) {
    response.json(error);
  }
};

export default { selectInventory, selectInventoryByPeriod };
