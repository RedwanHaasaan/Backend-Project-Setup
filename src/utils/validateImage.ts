import { fileTypeFromBuffer } from "file-type";
import { IMAGE_UPLOAD } from "../constants/upload.js";
import ImageError from "../errors/ImageError.js";

export const validateImageBuffer = async (buffer: Buffer): Promise<void> => {
    const detectedType = await fileTypeFromBuffer(buffer);

    if (!detectedType) {
        throw new ImageError("Unable to determine the actual file type.", "The file might be corrupted or in an unsupported format.");
    }

    if (!IMAGE_UPLOAD.ALLOWED_MIME_TYPES.includes(detectedType.mime as (typeof IMAGE_UPLOAD.ALLOWED_MIME_TYPES)[number])) {
        throw new ImageError("Invalid image file.", "Ensure the uploaded file is a valid image type (e.g. JPEG, PNG, WEBP).");
    }
};