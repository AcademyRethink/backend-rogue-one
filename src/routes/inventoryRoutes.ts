import { Router } from 'express';
import inventoryController from '../controllers/inventoryController';

const router: Router = Router();

router.get('/', inventoryController.selectInventory);
router.get('/products', inventoryController.selectProducts);
router.get('/:from/:to', inventoryController.selectInventoryByPeriod);

export default router;