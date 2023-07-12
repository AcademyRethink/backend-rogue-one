import { Router } from 'express';
import graphController from '../controllers/graphController';

const router: Router = Router();

router.get('/2/:from/:to', graphController.selectInventoryAndReportByPeriod);

export { router };
