import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to mongoDB database ${conn.connection.host}`)
    } catch (error) {
        console.log('Error while connecting with database', error);
    }
}

export default connectDB;