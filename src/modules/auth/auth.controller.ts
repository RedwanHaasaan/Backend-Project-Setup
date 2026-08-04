import { Request, Response } from "express";
import userService from "./user.service.js";

const registerController = (req: Request, res: Response) => {
  try {
    const result = userService.registerService(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

const loginController = (req: Request, res: Response) => {
  try {
    const result = userService.loginService(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: (error as Error).message,
    });
  }
};

export default {
  registerController,
  loginController,
};