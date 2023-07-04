import express, { Application } from 'express';
import authRoutes from './routes/authRoute';
import { dashboardRoute } from './routes/dashboardRoute';
import { auth } from './middlewares/auth';
import * as dotenv from 'dotenv';
dotenv.config();

// Crie uma instância do aplicativo Express
const app: Application = express();

app.use(express.json());
// Defina as rotas
app.use('/auth', authRoutes);

// Definindo middleware de verificação/validação do token
app.use(auth);

// Definindo rotas "privadas"
app.use('/dashboard', dashboardRoute);

app.listen(3050, () => {
  console.log('Server listening on port 3050');
});
