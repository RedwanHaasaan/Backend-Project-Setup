import multer from "multer";
import { IMAGE_UPLOAD } from "../constants/upload.js";

const storage = multer.memoryStorage();

const fileFilter: multer.Options["fileFilter"] = (_req, file, callback) => {
    if (
        !IMAGE_UPLOAD.ALLOWED_MIME_TYPES.includes(
            file.mimetype as (typeof IMAGE_UPLOAD.ALLOWED_MIME_TYPES)[number],
        )
    ) {
        return callback(
            new Error("Only JPEG, PNG, and WebP images are allowed."),
        );
    }

    callback(null, true);
};

export const uploadImage = multer({
    storage,
    limits: {
        fileSize: IMAGE_UPLOAD.MAX_FILE_SIZE,
        files: 1,
    },
    fileFilter,
});