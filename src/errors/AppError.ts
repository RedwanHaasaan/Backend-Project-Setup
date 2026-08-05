class AppError extends Error {
  statusCode: number;
  errors?: unknown;
  hints?: string;

  constructor(
    statusCode: number,
    message: string,
    errors?: unknown,
    hints?: string
  ) {
    super(message);

    this.statusCode = statusCode;
    this.errors = errors;
    this.hints = hints;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;