import { ZodError } from "zod";

const handleZodError = (error: ZodError) => {
  return {
    statusCode: 400,
    message: "Validation Error",
    errors: error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    })),
    hints: "Check your request body and enter valid data according to the schema",
  };
};

export default handleZodError;