import { Router } from 'express';
import reportController from '../controllers/reportController';

const router: Router = Router();

router.get('/', reportController.selectProductsFromController);

export { router };
