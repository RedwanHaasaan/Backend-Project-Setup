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
  resendApiKey: envVariables.RESEND_API_KEY,
  smtpFrom: envVariables.SMTP_FROM,
  cloudName: envVariables.CLOUDINARY_CLOUD_NAME,
  cloudApiKey: envVariables.CLOUDINARY_API_KEY,
  cloudApiSecret: envVariables.CLOUDINARY_API_SECRET,
  clamAvHost: envVariables.CLAMAV_HOST,
  clamAvPort: envVariables.CLAMAV_PORT
};