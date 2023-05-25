import connectionDB from "./config/database.js";
import dotenv from "dotenv";
import app from "./app.js";


//Settings
dotenv.config({ path: "./config/config.env" });

//Database Connection
connectionDB();

//Listen to the port
app.listen(process.env.PORT,()=>{
    console.log(`Server at port:${process.env.PORT} in mode ${process.env.MODE}`);
})


 