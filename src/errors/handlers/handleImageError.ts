import ImageError from "../ImageError.js";
import HttpStatus from "../../constants/httpStatus.js";

const handleImageError = (error: ImageError) => {
  return {
    statusCode: HttpStatus.BAD_REQUEST,
    message: "Image Processing Failed",
    errors: [
      {
        path: "image",
        message: error.message,
      },
    ],
    hints: error.hints || `Error type: ${error.name}. Please check your image format, size, or try again later.`,
  };
};

export default handleImageError;
