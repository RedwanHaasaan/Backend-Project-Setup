import { Router } from "express";
import authRouter from "../modules/auth/auth.route.js";
import imageRouter from "../modules/image/image.route.js"
const router: Router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: authRouter,
  },
  {
    path: "/images",
    route: imageRouter,
  }
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;