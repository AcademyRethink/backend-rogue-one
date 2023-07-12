import express, { Application } from 'express';
import authRoutes from './routes/authRoute';
import { router as graphRouter } from './routes/graphRoute';
import { dashboardRoute } from './routes/dashboardRoute';
import { auth } from './middlewares/auth';
import * as dotenv from 'dotenv';
dotenv.config();

const app: Application = express();

const port = process.env.PORT || 8080;

app.use(express.json());
app.use('/auth', authRoutes);

app.use(auth);
app.use('/dashboard', dashboardRoute);

app.listen(port, () =>
  console.log(`Server listening on port ${port}. http://localhost:${port}`)
);
