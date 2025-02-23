declare namespace NodeJS {
  interface ProcessEnv {
    REDIS_HOST: string;
    REDIS_PORT: string;
    REDIS_DB: string;
  }
}
