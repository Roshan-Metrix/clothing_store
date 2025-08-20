import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routes/authRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.get('/',(req,res) => {
    res.send("API working")
})

app.use('/api/auth',authRouter);

app.listen(PORT,() => {
    console.log(`App is running at ${PORT}`)
})