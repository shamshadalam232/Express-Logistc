import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import path from "path"
// env load
dotenv.config();

//app create
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// DB connect
connectDB();

//test route
app.get("/", (req, res) => {
    res.send("backend is running ...");
})

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

     app.use((req, res) => {
        res.sendFile(path.join(__dirname, "../frontend" , "dist", "index.html"))
    })
}


// start server
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));