import cloudinary from "../../config/cloudinary.js";
import { prisma } from "../../lib/prisma.js";
import { generateImageName } from "../../utils/generateImageName.js";
import { validateImageExtension } from "../../utils/image.utils.js";
import { validateImageBuffer } from "../../utils/validateImage.js";
// import { antivirusScanner } from "./clamav.scanner.js";
import { uploadToCloudinary } from "./cloudinary.service.js";
import { processImage } from "./image.processor.js";
// import AvScannerError from "../../errors/AvScannerError.js";

export const uploadUserImage = async (userId: string, file: Express.Multer.File) => {

    validateImageExtension(file.originalname);
    await validateImageBuffer(file.buffer);
    //will be enable in production
    // const scanResult = await antivirusScanner.scan(file.buffer);

    // if (!scanResult.clean) {
    //     throw new AvScannerError(
    //         scanResult.reason ?? "Malicious file detected.",
    //         "The uploaded file failed security scans. Please ensure the file is safe."
    //     );
    // }

    const processedBuffer = await processImage(file.buffer);

    const filename = generateImageName();
    const publicId = filename.replace(/\.webp$/i, "");

    const cloudinaryResult = await uploadToCloudinary(processedBuffer, publicId);

    try {
        const image = await prisma.image.create({
            data: {
                userId,
                publicId: cloudinaryResult.public_id,
                secureUrl: cloudinaryResult.secure_url,
                originalName: file.originalname,
                mimeType: "image/webp",
                size: processedBuffer.length,
                width: cloudinaryResult.width,
                height: cloudinaryResult.height,
            },
        });
        return {
            id: image.id,
            secureUrl: image.secureUrl,
            width: image.width,
            height: image.height,
        };
    } catch (error) {
        await cloudinary.uploader.destroy(
            cloudinaryResult.public_id,
            {
                resource_type: "image",
            },
        );
        throw error;
    }
};