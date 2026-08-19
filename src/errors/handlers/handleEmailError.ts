import EmailError from "../EmailError.js";
import HttpStatus from "../../constants/httpStatus.js";

const handleEmailError = (error: EmailError) => {
  return {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: "Email Sending Failed",
    errors: [
      {
        path: "email",
        message: error.message,
      },
    ],
    hints: `Error type: ${error.name}. Please check your email provider configuration or try again later.`,
  };
};

export default handleEmailError;
