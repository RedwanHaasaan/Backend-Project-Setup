import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../utils/catchAsync.js";
import * as imageService from "./image.service.js";
import sendResponse from "../../utils/sendResponse.js";
import HttpStatus from "../../constants/httpStatus.js";

export const uploadUserImageController: RequestHandler = catchAsync(async (req: Request, res: Response) => {
    if (!req.file) {
        throw new Error("Image file is required.");
    }
    const { userId } = req.params;
    
    if (!userId || typeof userId !== 'string') {
        throw new Error("Valid User ID is required.");
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