import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { checkoutSuccess, createCheckoutSession } from "../controllers/payment.controller.js";

const paymentRoutes = express.Router();

paymentRoutes.post("/create-checkout-session", protectRoute, createCheckoutSession);
paymentRoutes.post("/checkout-success", protectRoute, checkoutSuccess);

export default paymentRoutes;
