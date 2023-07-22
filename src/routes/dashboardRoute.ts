import { report as reportRouter } from './reportRoutes';
import { router as categoriesRoutes } from './categories';
import { router as graphRouter } from './graphRoute';
import { router as inventoryRouter } from './inventoryRoutes';

import { Router } from 'express';

const dashboardRoute: Router = Router();

dashboardRoute.get('/', (req, res) => {
  return res.json({ message: 'Hello, this is the dashboard!' });
});

dashboardRoute.use('/inventory', inventoryRouter);
dashboardRoute.use('/graphs', graphRouter);
dashboardRoute.use('/categories', categoriesRoutes);
dashboardRoute.use('/report', reportRouter);

dashboardRoute.use('/',  (req, res) => {
  return res.json({ ok: true });
});;

dashboardRoute.post('/home', (req, res) => {
  return res.json({ ok: true });
});

export { dashboardRoute };
