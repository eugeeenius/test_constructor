import express, { Application, json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { init } from './mysql.connector';
import { errorMiddleware } from './middlewares/error.middleware';
import router from './routes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT;
init();

app.use(errorMiddleware);
app.use(cors());
app.use(cookieParser());
app.use(json());
app.use(router);

const start = () => {
  try {
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch(e) {
    console.error(e);
  }
};

start();
