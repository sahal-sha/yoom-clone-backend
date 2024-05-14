import express from "express"
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./apis/routes/auth.routes.js";
import messageRoutes from "./apis/routes/message.routes.js";
import userRoutes from "./apis/routes/user.routes.js";
import cookieParser from "cookie-parser";





const app = express();
dotenv.config();
app.use(express.json());// to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);




const PORT= process.env.PORT || 5000;

const MongoDB = process.env.MONGO_DB



app.listen(PORT,()=>{
    console.log("listen port", PORT);
})


async function main(){
    try{
        await mongoose.connect(MongoDB)
        console.log("Database connected...");
    }
    catch(error){
        console.log("Error connecting database :",error);
    }
}
main()



