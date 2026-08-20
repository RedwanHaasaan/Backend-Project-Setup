import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import AppError from './AppError.js';
import handleZodError from './handlers/handleZodError.js';
import formatError from './formatError.js';
import HttpStatus from '../constants/httpStatus.js';
import handleAppError from './handlers/handleAppError.js';
import handleUnknownError from './handlers/handleUnknownError.js';
import { Prisma } from '../generated/prisma/client.js';
import handlePrismaError from './handlers/handlePrismaError.js';
import EmailError from './EmailError.js';
import handleEmailError from './handlers/handleEmailError.js';
import ImageError from './ImageError.js';
import handleImageError from './handlers/handleImageError.js';
import AvScannerError from './AvScannerError.js';
import handleAvScannerError from './handlers/handleAvScannerError.js';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  let message = 'Internal Server Error';
  let errors: unknown[] = [];
  let hints: string | undefined;

  //handle zod error
  if (error instanceof ZodError) {
    const simplified = handleZodError(error);

    statusCode = simplified.statusCode;
    message = simplified.message;
    errors = simplified.errors;
    hints = simplified.hints;
  }
  //handle prisma error
  else if (
    error instanceof Prisma.PrismaClientKnownRequestError ||
    error instanceof Prisma.PrismaClientUnknownRequestError ||
    error instanceof Prisma.PrismaClientValidationError ||
    error instanceof Prisma.PrismaClientInitializationError ||
    error instanceof Prisma.PrismaClientRustPanicError
  ) {
    const simplified = handlePrismaError(error);

    statusCode = simplified.statusCode;
    message = simplified.message;
    errors = simplified.errors;
    hints = simplified.hints;
  }

  else if (error instanceof AppError) {
    const simplified = handleAppError(error);

    statusCode = simplified.statusCode;
    message = simplified.message;
    errors = simplified.errors;
    hints = simplified.hints;
  }
  else if (error instanceof EmailError) {
    const simplified = handleEmailError(error);

    statusCode = simplified.statusCode;
    message = simplified.message;
    errors = simplified.errors;
    hints = simplified.hints;
  }
  else if (error instanceof ImageError) {
    const simplified = handleImageError(error);

    statusCode = simplified.statusCode;
    message = simplified.message;
    errors = simplified.errors;
    hints = simplified.hints;
  }
  else if (error instanceof AvScannerError) {
    const simplified = handleAvScannerError(error);

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
