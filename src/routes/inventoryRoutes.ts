import { Router } from 'express';
import inventoryController from '../controller/inventoryController';

const router: Router = Router();

router.get('/', inventoryController.selectInventory);
router.get('/grouped', inventoryController.selectInventoryByPeriod);
