import multer from "multer";
import fs from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "uploads", "approval");

// Ensure folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("✅ Created uploads/approval directory");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("📁 Saving file to:", uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${req.params.id}${ext}`;
    console.log("💾 Filename:", filename);
    cb(null, filename);
  },
});

const uploadPdf = multer({
  storage,
  fileFilter: (req, file, cb) => {
    console.log("📄 File mimetype:", file.mimetype);
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files allowed"));
    }
    cb(null, true);
  },
});

export default uploadPdf;