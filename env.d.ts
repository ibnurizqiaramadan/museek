declare namespace NodeJS {
  interface ProcessEnv {
    APP_BASE_URL: string;
    BACKEND_API_URL: string;
    REDIS_HOST: string;
    REDIS_PORT: string;
    REDIS_DB: string;
    HASURA_ADMIN_SECRET: string;
    JWT_SECRET: string;
    JWT_EXPIRATION: string;
    JWT_ALGORITHM: string;
  }
}
