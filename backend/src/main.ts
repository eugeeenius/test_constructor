require('dotenv').config();
import express, { Application } from 'express';
import sequelize from './db';

const app: Application = express();
const PORT = process.env.PORT;

const start = async () => {
  try {
    await sequelize.authenticate();
    app.listen(PORT, () => console.log('start'));
  } catch(e) {
    console.error(e);
  }
};

start();
