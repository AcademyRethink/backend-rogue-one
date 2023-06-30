import { router as categoriesRoutes } from './categories';

import { Router } from 'express';

const router: Router = Router();

router.use('/categories', categoriesRoutes);

export { router };
