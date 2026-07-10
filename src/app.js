import express from "express";
import cors from "cors";
import globalErrorHandler from "./config/globalErrorHandler.js";

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());

// Global Error Handler
app.use(globalErrorHandler);
export default app;
