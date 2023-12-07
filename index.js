import express from "express"
import dotenv from "dotenv"
import mongoose from 'mongoose'
import authRoute from './api/routes/auth.js'
import hotelRoute from './api/routes/hotels.js'
import roomsRoute from './api/routes/rooms.js'
import usersRoute from './api/routes/users.js'
import cookieParser from "cookie-parser"

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

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected!")
})

mongoose.connection.on("connected", () => {
    console.log("MongoDB connected!")
})

// Middleware
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelRoute)
app.use("/api/rooms", roomsRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'Something went wrong!'
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
});


app.listen(8800, () => {
    dbConnect();
    console.log('Connection established to backend successfully');
})