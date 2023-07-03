import express, { Application, Request, Response } from 'express';
import { dashboardRoute } from './routes/dashboardRoute';

const app: Application = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('to aqui');
});

// Definindo rotas "privadas"
app.use('/dashboard', dashboardRoute);

app.listen(3050, () => {
  console.log('Servidor rodando na porta 3050');
});
