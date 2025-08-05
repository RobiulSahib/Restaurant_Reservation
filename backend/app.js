


import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import { dbConnection } from "./database/dbConnection.js";

const app = express();

// Load environment variables
dotenv.config({ path: "./config/config.env" });

console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("PORT:", process.env.PORT);

// CORS setup
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST"],
    credentials: true,
  })
);

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api/v1/reservation", reservationRouter);

// Test route to verify server is running
app.get("/api/v1/test", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Test route is working!",
  });
});

// Optional: a basic root route
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "HELLO WORLD AGAIN",
  });
});

// Connect to MongoDB
dbConnection();

// Error handling middleware
app.use(errorMiddleware);

export default app;
