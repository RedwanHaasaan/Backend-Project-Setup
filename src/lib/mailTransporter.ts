import nodemailer from "nodemailer";
import { env } from "../config/env.js";

const transporter = nodemailer.createTransport({
    host: env.smtpHost,
    port: Number(env.smtpPort ?? 587),
    secure: Number(env.smtpPort) === 465,
    auth: {
        user: env.smtpUser,
        pass: env.smtpPass,
    },
});

export const verifyMailTransporter = async () => {
    try {
        await transporter.verify();
        console.log("Mail Server Configured Successfully");
    } catch (error) {
        console.error("Mail Server Configuration Error:", error);
    }
};


export default transporter;