import path from "node:path";
import { IMAGE_UPLOAD } from "../constants/upload.js";
import ImageError from "../errors/ImageError.js";

export const validateImageExtension = (filename: string): void => {
    const extension = path.extname(filename).toLowerCase();

    if (!IMAGE_UPLOAD.ALLOWED_EXTENSIONS.includes(extension as (typeof IMAGE_UPLOAD.ALLOWED_EXTENSIONS)[number])) {
        throw new ImageError("Invalid image extension.", "Only permitted image extensions are allowed. Check your file extension.");
    }
};