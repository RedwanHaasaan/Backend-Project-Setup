import { UploadApiResponse } from "cloudinary";
import cloudinary from "../../config/cloudinary.js";
import { IMAGE_UPLOAD } from "../../constants/upload.js";

export const uploadToCloudinary = (buffer: Buffer, publicId: string): Promise<UploadApiResponse> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: IMAGE_UPLOAD.CLOUDINARY_FOLDER,
                public_id: publicId,
                resource_type: "image",
                format: "webp",
            },
            (error, result) => {
                if (error) {
                    return reject(error);
                }

                if (!result) {
                    return reject(
                        new Error("Cloudinary returned no upload result."),
                    );
                }
                resolve(result);
            },
        );
        uploadStream.end(buffer);
    });
};