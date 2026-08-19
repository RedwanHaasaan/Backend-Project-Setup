import { env } from "../config/env.js";
import { resend } from "../lib/resend.js";
import { renderWelcomeEmail } from "./mail.template.js";
import EmailError from "../errors/EmailError.js";

interface SendWelcomeEmailOptions {
    to: string;
    name: string;
    createdAt: Date;
}

const sendWelcomeEmail = async ({
    to,
    name,
    createdAt,
}: SendWelcomeEmailOptions) => {
    const appName = "Express Backend";

    const html = await renderWelcomeEmail({
        appName,
        name,
        email: to,
        createdAt: createdAt.toLocaleString("en-US", {
            dateStyle: "long",
            timeStyle: "short",
        }),
        loginUrl: "http://localhost:3000/login",
        year: new Date().getFullYear(),
    });

    const { data, error } = await resend.emails.send({
        from: env.smtpFrom,
        to,
        subject: `Welcome to ${appName}!`,
        html,
        text: `
            Welcome, ${name}!

            Thank you for creating an account with ${appName}.

            Your account has been successfully created.

            Email: ${to}

            You can log in here:
            http://localhost:3000/login

            Best regards,
            The ${appName} Team
        `.trim(),
    });

    if (error) {
        throw new EmailError(error.message, error.name);
    }

    return data;
};

export default sendWelcomeEmail;