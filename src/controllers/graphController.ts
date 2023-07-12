import { Request, Response } from 'express';
import * as graphService from '../services/graphServices';

const selectInventoryAndReportByPeriod = async (
  request: Request,
  response: Response
) => {
  try {
    type DateString = `${number}${number}${number}${number}-${number}${number}`;

    const { cnpj, product_name } = request.body;
    const { from, to } = request.params;

    if (to.toString().localeCompare(from.toString()) < 0)
      throw new Error(`Misplaced arguments. You mean from ${to} to ${from}?`);

    const inventoryData = await graphService.selectInventoryAndReportByPeriod(
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

export default { selectInventoryAndReportByPeriod };
