import { report as reportRouter } from './reportRoutes';
import { router as categoriesRoutes } from './categories';

import { Router } from 'express';

const dashboardRoute: Router = Router();

dashboardRoute.get('/', (req, res) => {
  return res.json({ message: 'Hello, this is the dashboard!' });
});

dashboardRoute.use('/categories', categoriesRoutes);

dashboardRoute.use('/report', reportRouter);

dashboardRoute.post('/home', (req, res) => {
  return res.json({ ok: true });
});

export { dashboardRoute };
