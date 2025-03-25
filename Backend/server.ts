import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import prisma from "./src/config/database";
import projectRoutes from "./src/routes/projectRoutes";
import authRoutes from "./src/routes/authRoutes";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to enable CORS
app.use(cors({
  origin: '*',  
  methods: 'GET,POST,PUT,DELETE,OPTIONS',  
  allowedHeaders: 'Content-Type, Authorization',  
}));


// Middleware to parse JSON bodies
app.use(express.json());

// Database connection function
async function connectDB() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

// Connect to the database
connectDB();

// Register modular routes
app.use("/api/projects", projectRoutes);
app.use("/api/auths", authRoutes);  // Register auth routes

// Define the port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
