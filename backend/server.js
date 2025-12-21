import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

// Create __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// env load
dotenv.config();

const BASE_URL = process.env.APP_URL || "http://localhost:5000";

//app create
const app = express();

// middlewares
app.use(
  "*",
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

// DB connect
connectDB();

// ✅ CRITICAL: Static files PEHLE serve karo (uploads folder)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ✅ API routes
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

// ✅ Production mein frontend LAST mein serve karo
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");
  console.log("Serving frontend from:", frontendPath);
  
  // Static files (CSS, JS, images)
  app.use(express.static(frontendPath));

  // ✅ IMPORTANT: Catch-all route LAST mein hona chahiye
  // Yeh sirf un routes ko handle karega jo upar match nahi hue
  app.get("*", (req, res) => {
    // Agar request /uploads se start hoti hai, toh 404 return karo
    if (req.url.startsWith('/uploads')) {
      return res.status(404).send('File not found');
    }
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));