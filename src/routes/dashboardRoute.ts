import { router as categoriesRoutes } from './categories';

import { Router } from 'express';

const dashboardRoute: Router = Router();

dashboardRoute.use('/categories', categoriesRoutes);

export { dashboardRoute };
