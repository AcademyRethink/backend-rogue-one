import categoriesController from '../controllers/categoriesController';
import { Router } from 'express';

const router: Router = Router();

router.get('/', categoriesController.index);

export { router };
