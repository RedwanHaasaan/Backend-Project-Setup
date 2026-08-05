import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError.js";
import HttpStatus from "../constants/httpStatus.js";

const notFound = (req: Request,res: Response,next: NextFunction) => {
  next(
    new AppError(
      HttpStatus.NOT_FOUND,
      "Route Not Found",
      [],
      `The route '${req.originalUrl}' does not exist.`
    )
  );
};

export default notFound;