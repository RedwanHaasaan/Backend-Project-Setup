import HttpStatus from "../../constants/httpStatus.js";

const handleUnknownError = () => {
  return {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: "Internal Server Error",
    errors: [],
  };
};

export default handleUnknownError;