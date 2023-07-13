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
    const { cnpj, product_name, category } = request.body;

    const data = await inventoryServices.selectProducts(
      cnpj,
      product_name,
      category
    );
    response.status(200).json(data);
  } catch (error) {
    response.json(error);
  }
};

const selectInventoryByPeriod = async (
  request: Request,
  response: Response
) => {
  try {
    type DateString = `${number}${number}${number}${number}-${number}${number}`;

    const { cnpj, product_name } = request.body;
    const { from, to } = request.params;

    if (to.toString().localeCompare(from.toString()) < 0)
      throw new Error(`Misplaced arguments. You mean from ${to} to ${from}?`);

    const inventoryData = await inventoryServices.selectInventoryByPeriod(
      cnpj,
      from as DateString,
      to as DateString,
      product_name
    );
    response.status(200).json(inventoryData);
  } catch (error) {
    response.json(error);
  }
};

export default { selectInventory, selectInventoryByPeriod, selectProducts };
