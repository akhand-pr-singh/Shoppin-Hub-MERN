import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import productRouter from './routes/product.route.js';
import userRouter from './routes/authUser.route.js';

//configures env
dotenv.config();

//configures database
connectDB();

//REST object
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);

//check route
app.use('/',(req, res)=>{
    res.status(200).send('Hello! Shopping-Hub api welcomes you.');
});

//PORT
const PORT = process.env.PORT || 8080;

//Runs Listen
app.listen(PORT, ()=>{
    console.log(`The server is running on ${PORT}`);
});