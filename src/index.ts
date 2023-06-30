import express, { Application, Request, Response } from 'express';
import { router } from './routes';

const app: Application = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('to aqui');
});

app.use('/', router);
// Definindo rotas "privadas"
// app.use('/dashboard', dashboardRoute);

// Inicie o servidor
app.listen(3050, () => {
  console.log('Servidor rodando na porta 3050');
});
