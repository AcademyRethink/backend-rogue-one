import express, { Application } from 'express';
import cors from "cors"
import authRoutes from './routes/authRoute';
import { router as graphRouter } from './routes/graphRoute';
import { dashboardRoute } from './routes/dashboardRoute';
import resetPasswordLogged from './routes/resetPasswordLoggedRoute';
import { auth } from './middlewares/auth';
import * as dotenv from 'dotenv';
dotenv.config();

// Crie uma instância do aplicativo Express
const app: Application = express();
app.use(cors({ origin: '*' }));

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors())

app.use('/auth', authRoutes);

app.use(auth);
app.use('/', resetPasswordLogged)
app.use('/dashboard', dashboardRoute);

app.listen(port, () =>
  console.log(`Server listening on port ${port}. http://localhost:${port}`)
);
