import express, { Request, Response } from "express";
import { Server, Socket } from "socket.io";
import cors from "cors";
import { createServer } from "http";
import notificationsService from './services/notificationsService';
import routes from './routes/inventory'
import routesNotification from './routes/notificationRoute'

const app = express();
app.use(express.json());
app.use(cors());

app.use(routes)
app.use(routesNotification)

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });


io.on('connection', (socket: Socket) => {
 console.log('Cliente conectado:', socket.id);

  notificationsService.startProductQuantityCheck(socket);

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

const port = 8080;
httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});