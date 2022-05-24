import { createPool, Pool } from 'mysql2';

let pool: Pool;

export const init = () => {
  try {
    pool = createPool({
      user: process.env.MY_SQL_DB_USER,
      password: process.env.MY_SQL_DB_PASSWORD,
      database: process.env.MY_SQL_DB_DATABASE,
      host: process.env.MY_SQL_DB_HOST,
      connectionLimit: process.env.MY_SQL_DB_CONNECTION_LIMIT
    });
  } catch (e) {
    console.error('[dbConnector][init]: ', e);
    throw new Error('failed to initialize pool');
  }
};

export const execute = async <T>(query: string, params: string[] | Object): Promise<T> => {
  try {
    return new Promise<T>((resolve, reject) => {
      pool.query<any>(query, params, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  } catch (e) {
    console.log(e);
    throw new Error('Failed to execute MySQL query');
  }
};
