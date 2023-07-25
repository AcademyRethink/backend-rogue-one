import express, { Application } from 'express';
import cors from "cors"
import authRoutes from './routes/authRoute';
import { dashboardRoute } from './routes/dashboardRoute';
import resetPasswordLogged from './routes/resetPasswordLoggedRoute';
import { auth } from './middlewares/auth';
import * as dotenv from 'dotenv';
import { createServer } from 'http'; // Importe createServer do http
import { Server, Socket } from 'socket.io';
import notificationsService from './services/notificationsService';
import notificationRoute from './routes/notificationRoute'; 

dotenv.config();


const app: Application = express();
app.use(cors({ origin: '*' }));

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors())

app.use('/auth', authRoutes);


app.use(auth);

app.use('/', notificationRoute);
app.use('/', resetPasswordLogged)
app.use('/dashboard', dashboardRoute);

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket: Socket) => {
  console.log('Cliente conectado:', socket.id);

  notificationsService.startProductQuantityCheck(socket);

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

httpServer.listen(port, () =>
  console.log(`Server listening on port ${port}. http://localhost:${port}`)
);
