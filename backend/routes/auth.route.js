import express from "express";

import { protectRoute } from "../middleware/auth.middleware.js";
import { getProfile, login, logout, refreshToken, signup } from "../controllers/auth.controller.js";

const authRoutes = express.Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.post("/refresh-token", refreshToken);
authRoutes.get("/profile", protectRoute, getProfile);

export default authRoutes;
