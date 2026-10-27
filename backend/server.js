
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "https://express-logistic-yx6x.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// API routes
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ParcelTracking API is running",
  });
});

// Vercel will handle the server
export default app;
