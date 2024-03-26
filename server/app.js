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
    origin:"https://mad-stuffs.vercel.app"
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
app.use("/",userRoutes)


export default app