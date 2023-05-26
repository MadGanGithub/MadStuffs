import connectionDB from "./config/database.js";
import dotenv from "dotenv";

import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

//import adminRoutes from './routes/adminRoutes.js'
const app=express();

//cors 
app.use(cors({
    credentials:true,
    origin:"http://localhost:3000"
}))

//This converts request body to json 
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//cookie parser(if not used,cookies will be undefined)
app.use(cookieParser())

//body parser(To view in postman)
//app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())




//User
// app.use("/",userRoutes)
app.get("/",(req,res)=>{
    res.json({"message":"hjyfhjfcyn"})
})

//Settings
dotenv.config({ path: "./config/config.env" });

//Database Connection
connectionDB();

//Listen to the port
app.listen(process.env.PORT,()=>{
    console.log(`Server at port:${process.env.PORT} in mode ${process.env.MODE}`);
})


 