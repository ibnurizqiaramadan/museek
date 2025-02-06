export type CustomError = {
  statusCode: number;
  errors: {
    message: string;
    dbError?: string | null;
    error?: Error | string | null;
  };
} | null;

