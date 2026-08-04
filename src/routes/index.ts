import { Router } from "express";
import authRouter from "../modules/auth/auth.route.js";

const router:Router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: authRouter,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;