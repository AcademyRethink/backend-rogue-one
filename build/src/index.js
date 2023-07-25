"use strict";
/* import express, { Application  } from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import authRoutes from './routes/authRoute';
import inventoryRouter from './routes/inventoryRoutes';
import notificationRoute from './routes/notificationRoute';

import express, { Application } from 'express';
import cors from "cors"
import authRoutes from './routes/authRoute';
import { router as graphRouter } from './routes/graphRoute';

import { dashboardRoute } from './routes/dashboardRoute';
import { auth } from './middlewares/auth';
import * as dotenv from 'dotenv';
import notificationsService from './services/notificationsService';
import cors from 'cors';

dotenv.config();


const app: Application = express();
const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/', notificationRoute);
app.use(auth);
app.use('/inventory', inventoryRouter);
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


httpServer.listen(port, () => {
  console.log(`Server listening on port ${port}. http://localhost:${port}`);
}); */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const dashboardRoute_1 = require("./routes/dashboardRoute");
const resetPasswordLoggedRoute_1 = __importDefault(require("./routes/resetPasswordLoggedRoute"));
const auth_1 = require("./middlewares/auth");
const dotenv = __importStar(require("dotenv"));
const http_1 = require("http"); // Importe createServer do http
const socket_io_1 = require("socket.io");
const notificationsService_1 = __importDefault(require("./services/notificationsService"));
const notificationRoute_1 = __importDefault(require("./routes/notificationRoute"));
dotenv.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: '*' }));
const port = process.env.PORT || 8080;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/auth', authRoute_1.default);
app.use('/', notificationRoute_1.default);
app.use(auth_1.auth);
app.use('/', resetPasswordLoggedRoute_1.default);
app.use('/dashboard', dashboardRoute_1.dashboardRoute);
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*',
    },
});
io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);
    notificationsService_1.default.startProductQuantityCheck(socket);
    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
});
httpServer.listen(port, () => console.log(`Server listening on port ${port}. http://localhost:${port}`));
