import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer storage configuration for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'express_logistics/approval_pdfs', // Folder name in Cloudinary
    allowed_formats: ['pdf'],
    resource_type: 'raw', // Important for PDFs
    public_id: (req, file) => {
      // Use application ID as filename
      return `approval_${req.params.id}_${Date.now()}`;
    },

    flags: { "attachment": true }
  },
});

// Multer upload middleware
export const uploadPdfToCloud = multer({ 
  storage: storage,
  limits: { 
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    console.log("📄 Uploading file:", file.originalname);
    console.log("📄 File mimetype:", file.mimetype);
    
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed"));
    }
    cb(null, true);
  }
});

export const getViewablePdfUrl = (cloudinaryUrl) => {

    if (!cloudinaryUrl) return null;

    return cloudinaryUrl.replace('/upload/', '/upload/fl_attachment:false/');
};

// Export cloudinary instance for potential future use
export default cloudinary;