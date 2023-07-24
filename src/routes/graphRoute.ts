import { Router } from 'express';
import graphController from '../controllers/graphController';

const router: Router = Router();

router.post('/2/:limit', graphController.selectInventoryAndReportByPeriod);

export { router };
