import { Request, Response, RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import HttpStatus from '../../constants/httpStatus.js';
import authService from './auth.service.js';

export const registerController: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await authService.registerService(req.body);
    sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Registration Successful',
      data: result,
    });
  },
);

export const loginController: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await authService.loginService(req.body);

    sendResponse(res, {
      statusCode: HttpStatus.SUCCESS,
      success: true,
      message: 'Login Successful',
      data: result,
    });
  },
);

export default {
  registerController,
  loginController,
} as {
  registerController: RequestHandler;
  loginController: RequestHandler;
};
