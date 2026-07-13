import express from "express";
import { registerUser, loginUser, getUser } from "./user.controllers.js";
import auth from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.get("/:userId", auth, getUser);

export default userRouter;
