import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import { dbConnection } from "./utils/dbConnection.js";
import auth from "./routes/authRoute.js";
import UserRoute from "./routes/userRoute.js";

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      "http://localhost:5173",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan("dev"));

// Basic route
app.get("/", (req, res) => {
  res.send("Server running...");
});

// Routes
app.use("/api/auth", auth);
app.use("/api/user", UserRoute);

const PORT = process.env.PORT || 4000;
dbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
  });
});
