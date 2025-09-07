import express from 'express'
import { createProduct, deleteProduct, getAllProducts, getFeaturedProducts } from '../controllers/productControllers.js';
import { adminRoute, protectRoute } from '../middlewares/authMiddleware.js';

const productRouter = express.Router();

productRouter.get('/',protectRoute,adminRoute,getAllProducts)
productRouter.get('/featured',getFeaturedProducts)
productRouter.post('/',protectRoute,adminRoute,createProduct);
productRouter.delete('/:id',protectRoute,adminRoute,deleteProduct);

export default productRouter;