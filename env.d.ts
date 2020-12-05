declare namespace NodeJS {
  export interface ProcessEnv {
    JWT_SECRET: string;
    NODE_ENV?: 'development' | 'production' | 'test';
    PORT: string;
    DATABASE_URL: string;
    DATABASE_PORT: string;
    DATABASE_USER: string;
    DATABASE_PASSWORD: string;
    DATABASE_NAME: string;
  }
}
