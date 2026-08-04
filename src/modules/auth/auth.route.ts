import { Router } from "express";
import userController from "./auth.controller.js";

const authRouter: Router = Router();

authRouter.post("/register", userController.registerController);

authRouter.post("/login", userController.loginController);

export default authRouter;