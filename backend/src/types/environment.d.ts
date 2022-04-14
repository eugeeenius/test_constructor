declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      MY_SQL_DB_HOST: string;
      MY_SQL_DB_USER: string;
      MY_SQL_DB_PASSWORD: string;
      MY_SQL_DB_PORT: number;
      MY_SQL_DB_DATABASE: string;
    }
  }
}

export {};
