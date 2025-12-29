import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "express_logistics/approval_pdfs",
    resource_type: "raw",          // ✅ PDF ke liye MUST
    allowed_formats: ["pdf"],

    public_id: (req, file) => {
      return `approval_${req.params.id}`;
    },
  },
});

// Multer
export const uploadPdfToCloud = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    console.log("📄 Uploading:", file.originalname, file.mimetype);

    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files allowed"));
    }
    cb(null, true);
  },
});

export default cloudinary;
