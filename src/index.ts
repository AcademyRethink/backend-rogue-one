import express, { Application, Request, Response } from 'express';
import { dashboardRoute } from './routes/dashboardRoute';



const app: Application = express();

app.use(express.json());

app.use('/dashboard', dashboardRoute);

app.get('/', (req: Request, res: Response) => {

  res.send('FARMView Application API');

});

// Definindo rotas "privadas"


app.listen(3050, () => {
  console.log('Servidor rodando na porta 3050');
});
