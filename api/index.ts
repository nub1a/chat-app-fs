import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cors from "cors";
import cookieParser from "cookie-parser";
import { UserModel } from "./models/User";

dotenv.config();

mongoose.connect(process.env.MONGO_URL as string);

const jwtSecret = process.env.JWT_SECRET as string;

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.get("/profile", async (req, res) => {
  const token = req.cookies?.token;
  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, userData) => {
      if (err) throw err;
      res.json(userData);
    });

    return;
  }

  res.status(401).json("no token");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const createdUser = await UserModel.create({ username, password });

    jwt.sign(
      { userId: createdUser._id, username },
      jwtSecret,
      {},
      (err, token) => {
        if (err) throw err;
        res
          .cookie("token", token, { sameSite: "none", secure: true })
          .status(201)
          .json({
            id: createdUser._id,
          });
      }
    );
  } catch (e) {
    throw e;
  }
});

app.listen(4040);
