import dotenv from 'dotenv'
import connectDB from "./db/connect.js";
import { app } from './app.js';

dotenv.config();
const port=process.env.PORT || 8000;


connectDB()
.then(()=>{
    app.listen(port,()=>{
        console.log(`Server listening on ${port}`);
    })
})
.catch((err)=>{
    console.log("Failed to Connect DB",err);
})