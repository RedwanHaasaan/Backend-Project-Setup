import { UploadApiResponse } from "cloudinary";
import cloudinary from "../../config/cloudinary.js";
import { IMAGE_UPLOAD } from "../../constants/upload.js";
import ImageError from "../../errors/ImageError.js";

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
                    return reject(new ImageError(`Cloudinary upload failed: ${error.message || 'Unknown error'}`, "Please check your Cloudinary configuration and network connection."));
                }

                if (!result) {
                    return reject(
                        new ImageError("Cloudinary returned no upload result.", "Please check your Cloudinary configuration and network connection."),
                    );
                }
                resolve(result);
            },
        );
        uploadStream.end(buffer);
    });
};