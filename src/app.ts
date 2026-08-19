import { Application, Request, Response } from "express";
import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";
import router from "./routes/index.js";
import globalErrorHandler from "./errors/globalErrorHandler.js";
import notFound from "./middleware/notFound.js";
import { prisma } from "./lib/prisma.js";
const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use("/api/v1", router);
app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "API Running"
  });
});
app.get("/insert-test", async (_req, res) => {
  const start = performance.now();

  const user = await prisma.user.create({
    data: {
      fullname: "Performance Test",
      email: `performance-${Date.now()}@example.com`,
      password: "test-password",
    },
  });

  const duration = performance.now() - start;

  res.json({
    duration: `${duration.toFixed(2)}ms`,
    userId: user.id,
  });
});
// 404 Middleware
app.use(notFound);
app.use(globalErrorHandler);
export default app;