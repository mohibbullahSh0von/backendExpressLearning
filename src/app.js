import express from "express";
import cors from "cors";
import globalErrorHandler from "./config/globalErrorHandler.js";
import helmet from "helmet";

const app = express();

// Global Middlewares
// For cross origin resource sharing
app.use(cors());
// For security
app.use(helmet());
// For parsing data
app.use(express.json());

export default app;
