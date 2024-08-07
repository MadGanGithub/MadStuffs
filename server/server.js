import dotenv from "dotenv";
import app from './app.js';
import connectionDB from "./config/database.js";

//Settings
dotenv.config({ path: "./config/config.env" });

//Database Connection
connectionDB();

//Listen to the port
app.listen(process.env.PORT,()=>{
    console.log(`Server at port:${process.env.PORT} in mode ${process.env.MODE}`);
})