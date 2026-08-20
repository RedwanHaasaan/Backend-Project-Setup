import { fileTypeFromBuffer } from "file-type";
import { IMAGE_UPLOAD } from "../constants/upload.js";

export const validateImageBuffer = async (buffer: Buffer): Promise<void> => {
    const detectedType = await fileTypeFromBuffer(buffer);

    if (!detectedType) {
        throw new Error("Unable to determine the actual file type.");
    }

    if (!IMAGE_UPLOAD.ALLOWED_MIME_TYPES.includes(detectedType.mime as (typeof IMAGE_UPLOAD.ALLOWED_MIME_TYPES)[number])) {
        throw new Error("Invalid image file.");
    }
};