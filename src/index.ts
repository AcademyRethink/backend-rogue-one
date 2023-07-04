import express from 'express';
import * as dotenv from 'dotenv';
import inventoryRouter from "./routes/inventoryRoutes"

dotenv.config();

const app = express();

app.use(express.json())
app.use("/inventory", inventoryRouter)

app.listen(3050, () =>
  console.log('Server listening on port 3050. http://localhost:3050')
);
