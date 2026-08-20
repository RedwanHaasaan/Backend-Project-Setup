import sharp from "sharp";
import { IMAGE_UPLOAD } from "../../constants/upload.js";

export const processImage = async (buffer: Buffer): Promise<Buffer> => {
    return sharp(buffer)
        .rotate()
        .resize({
            width: IMAGE_UPLOAD.MAX_WIDTH,
            height: IMAGE_UPLOAD.MAX_HEIGHT,
            fit: "inside",
            withoutEnlargement: true,
        })
        .webp({
            quality: IMAGE_UPLOAD.WEBP_QUALITY,
        })
        .toBuffer();
};