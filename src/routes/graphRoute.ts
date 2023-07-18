import { Router } from 'express';
import graphController from '../controllers/graphController';

const router: Router = Router();

router.post('/2/:from/:to', graphController.selectInventoryAndReportByPeriod);

export { router };
