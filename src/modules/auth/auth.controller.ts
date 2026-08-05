import { Request, Response, RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync.js";
import userService from "./user.service.js";

export const registerController: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.registerService(req.body);

  res.status(201).json({
    success: true,
    message: "Registration Successful",
    data: result,
  });
});

export const loginController: RequestHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.loginService(req.body);
  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
});

export default {
  registerController,
  loginController,
} as {
  registerController: RequestHandler;
  loginController: RequestHandler;
};