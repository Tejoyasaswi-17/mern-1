import express from "express"
import dotenv from "dotenv"
import mongoose from 'mongoose'

const app = express();
dotenv.config()

const dbConnect = async() => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Connection established to MongoDB')
    } catch(error) {
        throw error;
    }
}



app.listen(8800, () => {
    dbConnect();
    console.log('Connection established to backend successfully');
})