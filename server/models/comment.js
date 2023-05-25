import mongoose from "mongoose";

const Schema=mongoose.Schema;

const commentSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    post_id:{
        type:String,
        required:true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    email:{
        type:String,
        required:true
    }
    ,comment:{
        type:String,
        required:true
    }
});

export default mongoose.model("comment",commentSchema);