import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { createProduct, deleteProduct, getAllProducts, getFeaturedProducts, getProductsByCategory, getRecommendedProducts, toggleFeaturedProduct } from "../controllers/product.controller.js";

const productRoutes = express.Router();

productRoutes.get("/", protectRoute, adminRoute, getAllProducts);
productRoutes.get("/featured", getFeaturedProducts);
productRoutes.get("/category/:category", getProductsByCategory);
productRoutes.get("/recommendations", getRecommendedProducts);
productRoutes.post("/", protectRoute, adminRoute, createProduct);
productRoutes.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);
productRoutes.delete("/:id", protectRoute, adminRoute, deleteProduct);

export default productRoutes;
