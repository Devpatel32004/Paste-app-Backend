import dotenv from "dotenv"
dotenv.config()

import express from "express"
import cors from "cors"
import connectDB from "./lib/db.js"
import cookieParser from "cookie-parser"

connectDB();

// routes imports

import userRouter from "./routes/user.route.js"
import pasteRouter from "./routes/paste.route.js"



const app = express()
const port = process.env.PORT || 8000


// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(cookieParser());


// routes

app.use("/api/user", userRouter);
app.use("/api/paste", pasteRouter);


app.listen(port, () => {
    console.log("server listening on port :", port)
})