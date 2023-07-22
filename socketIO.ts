import { Server, Socket } from 'socket.io';

const socketIO = (server: any) => {
  const io = new Server(server);

  io.on('connection', (socket: Socket) => {
    console.log('Cliente conectado:', socket.id);

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
    });
  });

  return io;
};

export default socketIO;
