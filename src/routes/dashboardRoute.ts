import { report as reportRouter } from './reportRoutes';
import { router as categoriesRoutes } from './categories';

import { Router } from 'express';

const dashboardRoute: Router = Router();

dashboardRoute.use('/categories', categoriesRoutes);

dashboardRoute.use('/report', reportRouter);

dashboardRoute.use('/',  (req, res) => {
  return res.json({ ok: true });
});;

dashboardRoute.post('/home', (req, res) => {
  return res.json({ ok: true });
});

export { dashboardRoute };
