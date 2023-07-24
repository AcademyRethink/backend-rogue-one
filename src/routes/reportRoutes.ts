import { Router } from 'express';
import reportController from '../controllers/reportController';

const report: Router = Router();
const laboratories: Router = Router();

report.get('/', reportController.selectProductsFromController);
report.get(
  '/laboratories',
  reportController.selectLaboratoryByProductFromController
);
report.get('/lastDate', reportController.getLastDate);

export { report, laboratories };
