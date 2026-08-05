import AppError from "../AppError.js";

const handleAppError = (error: AppError) => {
  return {
    statusCode: error.statusCode,
    message: error.message,
    errors: Array.isArray(error.errors) ? error.errors : [],
    hints: error.hints,
  };
};

export default handleAppError;