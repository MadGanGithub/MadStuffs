import mongoose from "mongoose";

const connectionDB=()=>{
    mongoose.connect("mongodb+srv://madhavganesan95:dNiTAULlGgZzVwEi@cluster0.ih7gufu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(db_meth=>(
        console.log(`MongoDB database connected with the host: ${db_meth.connection.host}`)
    ))
}

export default connectionDB; 