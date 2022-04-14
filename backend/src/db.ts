import { Sequelize } from 'sequelize';

export default new Sequelize(
  process.env.MY_SQL_DB_DATABASE as string,
  process.env.MY_SQL_DB_USER as string,
  process.env.MY_SQL_DB_PASSWORD as string,
  {
    dialect: 'mysql',
    host: process.env.MY_SQL_DB_HOST,
    port: process.env.MY_SQL_DB_PORT
  }
);
