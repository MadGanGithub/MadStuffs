import mongoose from "mongoose";

const Schema=mongoose.Schema;

const postSchema=new Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    content:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
}); 

export default mongoose.model("Post",postSchema);