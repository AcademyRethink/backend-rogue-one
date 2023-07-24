import { Request, Response } from 'express';
import * as graphService from '../services/graphServices';

const selectInventoryAndReportByPeriod = async (
  request: Request,
  response: Response
) => {
  try {
    // type DateString = `${number}${number}${number}${number}-${number}${number}`;

    const { cnpj, product_name, completeLabel } = request.body;
    const { limit } = request.params;

    const inventoryData = await graphService.selectInventoryAndReportByPeriod(
      cnpj,
      product_name?.toString(),
      Number(limit),
      completeLabel
    );
    response.status(200).json(inventoryData);
  } catch (error) {
    response.json(error);
  }
};

export default { selectInventoryAndReportByPeriod };
