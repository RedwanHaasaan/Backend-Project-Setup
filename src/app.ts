import { Application, Request, Response } from "express";
import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";
import router from "./routes/index.js";
const app:Application=express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use("/api/v1", router);
app.get("/", (req:Request, res:Response) => {
  res.json({
    success: true,
    message: "API Running"
  });
});
export default app;