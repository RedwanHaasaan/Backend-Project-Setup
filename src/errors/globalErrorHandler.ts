import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

import AppError from './AppError.js';
import handleZodError from './handlers/handleZodError.js';
import formatError from './formatError.js';
import HttpStatus from '../constants/httpStatus.js';
import handleAppError from './handlers/handleAppError.js';
import handleUnknownError from './handlers/handleUnknownError.js';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  let message = 'Internal Server Error';
  let errors: unknown[] = [];
  let hints: string | undefined;

if (error instanceof ZodError) {
  const simplified = handleZodError(error);

  statusCode = simplified.statusCode;
  message = simplified.message;
  errors = simplified.errors;
}

else if (error instanceof AppError) {
  const simplified = handleAppError(error);

  statusCode = simplified.statusCode;
  message = simplified.message;
  errors = simplified.errors;
  hints = simplified.hints;
}

else {
  const simplified = handleUnknownError();
  statusCode = simplified.statusCode;
  message = simplified.message;
}

res.status(statusCode).json(
  formatError({
    statusCode,
    message,
    errors,
    hints,
    stack: error.stack,
  })
);
};

export default globalErrorHandler;
