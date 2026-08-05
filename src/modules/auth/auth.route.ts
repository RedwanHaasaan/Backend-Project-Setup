import { Router } from "express";
import userController from "./auth.controller.js";
import { loginSchema } from "./auth.validationSchema.js";
import validateRequest from "../../middleware/validateRequest.js";

const authRouter: Router = Router();

authRouter.post("/register", userController.registerController);

authRouter.post("/login",validateRequest(loginSchema),userController.loginController);

export default authRouter;