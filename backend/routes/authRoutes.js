import express from 'express';
import { login, logout, refreshToken, signup } from '../controllers/authControllers.js';



const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/refresh-token', refreshToken);

export default authRouter;
