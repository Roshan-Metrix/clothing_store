import express from 'express';
import { addToCart } from '../controllers/cartControllers.js';

const cartRouter = express.Router();

cartRouter.post('/',addToCart);

export default cartRouter;