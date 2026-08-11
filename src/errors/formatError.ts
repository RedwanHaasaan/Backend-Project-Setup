import { env } from '../config/env.js';
import { IFormattedError } from '../types/errorResponse.js';

const formatError = ({
  statusCode,
  message,
  errors = [],
  hints,
  stack,
}: IFormattedError) => {
    
  const isDevelopment = env.nodeEnv === 'development';

  if (isDevelopment) {
    return { success: false, statusCode, message, errors, hints, stack };
  }

  return { success: false, statusCode, message, errors };
};

export default formatError;
