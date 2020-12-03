declare namespace NodeJS {
  export interface ProcessEnv {
    JWT_SECRET: string;
    NODE_ENV: string;
    PORT: number;
  }
}