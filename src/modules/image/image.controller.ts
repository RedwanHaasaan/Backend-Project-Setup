import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import * as imageService from "./image.service.js";
import sendResponse from "../../utils/sendResponse.js";
import HttpStatus from "../../constants/httpStatus.js";
import AppError from "../../errors/AppError.js";

export const uploadUserImageController: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    if (!req.file) {
        throw new AppError(HttpStatus.BAD_REQUEST, "Image file is required.", [], "Please attach an image file to the request.");
    }
    const { userId } = req.params;
    
    if (!userId || typeof userId !== 'string') {
        throw new AppError(HttpStatus.BAD_REQUEST, "Valid User ID is required.", [], "Make sure you are passing a valid string user ID in the request parameters.");
    }

    const result = await imageService.uploadUserImage(
        userId,
        req.file,
    );

    sendResponse(res, {
        statusCode: HttpStatus.CREATED,
        success: true,
        message: "Image uploaded successfully",
        data: result,
    });
},
);