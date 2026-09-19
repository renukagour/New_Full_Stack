import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

//configuration for data acceptance or settings
app.use(express.json({ limit: "16kb" })) //accept json data
app.use(express.urlencoded({ extended: true, limit: "16kb" }))// accept data from url
                                                            //extended true means also accept object inside
app.use(express.static('public')) //to store assets in folder or project like image favicon
app.use(cookieParser());


export { app }