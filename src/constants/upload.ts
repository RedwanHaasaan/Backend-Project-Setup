export const IMAGE_UPLOAD = {
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5 MB

    ALLOWED_MIME_TYPES: [
        "image/jpeg",
        "image/png",
        "image/webp",
    ] as const,

    ALLOWED_EXTENSIONS: [
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
    ] as const,

    MAX_WIDTH: 1600,
    MAX_HEIGHT: 1600,

    WEBP_QUALITY: 82,

    CLOUDINARY_FOLDER: "shopnercoat/students",
} as const;