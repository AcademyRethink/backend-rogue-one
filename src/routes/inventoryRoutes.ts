import { Router } from 'express';
import inventoryController from '../controllers/inventoryController';

const router: Router = Router();

router.get('/', inventoryController.selectInventory);
router.get('/products', inventoryController.selectProducts);

export { router };
