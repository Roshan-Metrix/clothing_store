import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/mongodb.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoutes.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';

dotenv.config({quiet: true});
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());

connectDB();

app.get('/',(req,res) => {
    res.send("API working")
})

app.use('/api/auth',authRouter);
app.use('/api/products',productRouter);
app.use('/api/cart',cartRouter);

app.listen(PORT,() => {
    console.log(`App is running at ${PORT}`)
})

// 2:10