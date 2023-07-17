import express, { Application } from 'express';
import authRoutes from './routes/authRoute';
import inventoryRouter from "./routes/inventoryRoutes"
import { dashboardRoute } from './routes/dashboardRoute';
import { auth } from './middlewares/auth';
import cors from "cors";
import * as dotenv from 'dotenv';
dotenv.config();


// Crie uma instância do aplicativo Express
const app: Application = express();
app.use(cors({origin: '*'}))

const port = process.env.PORT || 8080;

app.use(express.json());
app.use('/auth', authRoutes);

app.use(auth);
app.use("/inventory", inventoryRouter)
app.use("/dashboard", dashboardRoute);

app.listen(port, () =>
  console.log(`Server listening on port ${port}. http://localhost:${port}`)
);
