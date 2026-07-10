import mongoose from "mongoose";
import User from "./user.model.js";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // basic validation, later will improve using express validator
    if (!name || !email || !password) {
      return next(createHttpError(400, "All the fields are required"));
    }

    const alreadyExist = await User.findOne({ email });

    if (alreadyExist) {
      return next(createHttpError(400, "User already exist.Please Log in."));
    }

    const newUser = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    if (!newUser) {
      return next(
        createHttpError(
          500,
          "Oops!! something went wrong. User creation failed. Please try again later",
        ),
      );
    }
    const newUserId = newUser._id;
    return res
      .status(201)
      .json({ message: "User registered successfully. User id : ", newUserId });
  } catch (error) {
    next(createHttpError(400, error.message));
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(
        createHttpError(404, "User don't exist. Please, register first."),
      );
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return next(400, "email or password doesn't match");
    }

    // jwt configuration
    const payload = {
      userId: user._id,
      role: "user",
    };
    const secretKey = process.env.JWT_SECRET_PRIVATE_KEY;

    const jwtAccessToken = await jwt.sign(payload, secretKey, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      message: "Logged in successfully",
      accessToken: jwtAccessToken,
    });
  } catch (error) {
    return next(error);
  }
};
