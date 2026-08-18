import path from "node:path";
import { fileURLToPath } from "node:url";
import ejs from "ejs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface WelcomeEmailData {
    appName: string;
    name: string;
    email: string;
    createdAt: string;
    loginUrl?: string;
    year: number;
}

export const renderWelcomeEmail = async (data: WelcomeEmailData) => {
    const templatePath = path.join(__dirname, "..", "templates", "welcome.ejs");
    return ejs.renderFile(templatePath, data);
};