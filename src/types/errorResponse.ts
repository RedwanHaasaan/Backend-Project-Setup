export interface IFormattedError {
  statusCode: number;
  message: string;
  errors?: unknown[];
  hints?: string;
  stack?: string;
}