import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

import AppError from './AppError.js';
import handleZodError from './handleZodError.js';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = 'Internal Server Error';
  let errors: unknown[] = [];
  let hints: string | undefined;

  if (error instanceof ZodError) {
    const simplified = handleZodError(error);

    statusCode = simplified.statusCode;
    message = simplified.message;
    errors = simplified.errors;
  } else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    errors = Array.isArray(error.errors) ? error.errors : [];
    hints = error.hints;
  } else if (error instanceof Error) {
    message = error.message;
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors,
    hints,
    ...(process.env.NODE_ENV === 'development' && {
      stack: error.stack,
    }),
  });
};

export default globalErrorHandler;
