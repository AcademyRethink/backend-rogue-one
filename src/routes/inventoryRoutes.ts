import { Router } from 'express';
import inventoryController from '../controllers/inventoryController';

const router: Router = Router();

router.post('/', inventoryController.selectInventory);
router.post('/products', inventoryController.selectProducts);

export { router };
