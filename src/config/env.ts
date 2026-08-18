import dotenv from "dotenv";
import path from "path";
import { envValidate } from "./env.validate.js";

dotenv.config({
  path: path.join(process.cwd(), '.env')
});

const envVariables = envValidate()

export const env = {
  port: envVariables.PORT,
  nodeEnv: envVariables.NODE_ENV,
  dbUrl: envVariables.DATABASE_URL,
  smtpHost: envVariables.SMTP_HOST,
  smtpPort: envVariables.SMTP_PORT,
  smtpUser: envVariables.SMTP_USER,
  smtpPass: envVariables.SMTP_PASS,
  smtpFrom: envVariables.SMTP_FROM,
};