import express from "express";
import dotEnv from "dotenv";
import signup from "./controllers/auth/signup.js";
import signin from "./controllers/auth/signin.js";
import userDetails from "./controllers/user/userDetails.js";
import isAuth from "./helpers/isAuth.js";
import cookieParser from "cookie-parser";
import logout from "./controllers/auth/logout.js";

export const app = express();
dotEnv.config();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/api/v1/user", isAuth, userDetails);
app.post("/api/v1/signup", signup);
app.post("/api/v1/login", signin);
app.get("/api/v1/logout", isAuth, logout);
