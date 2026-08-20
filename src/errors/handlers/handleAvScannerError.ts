import AvScannerError from "../AvScannerError.js";
import HttpStatus from "../../constants/httpStatus.js";

const handleAvScannerError = (error: AvScannerError) => {
  return {
    statusCode: HttpStatus.BAD_REQUEST,
    message: "File Scan Failed",
    errors: [
      {
        path: "file",
        message: error.message,
      },
    ],
    hints: error.hints || `Error type: ${error.name}. The uploaded file was rejected by the antivirus scanner.`,
  };
};

export default handleAvScannerError;
