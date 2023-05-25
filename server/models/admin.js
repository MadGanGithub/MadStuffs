import mongoose from "mongoose";

const Schema =mongoose.Schema;

const adminSchema= new Schema({   
    username:{
        type:String,
        required:true,
        unique:true
    },
    key:{
        type:String,
        required:true,
    }
});

export default mongoose.model("Admin",adminSchema);