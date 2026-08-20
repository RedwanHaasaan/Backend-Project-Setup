import { Router } from "express";
import multer from "multer";

import { uploadUserImageController } from "./image.controller.js";

const router = Router();

const upload = multer({ storage: multer.memoryStorage(), });

router.post("/upload/:userId", upload.single("image"), uploadUserImageController);

export default router;