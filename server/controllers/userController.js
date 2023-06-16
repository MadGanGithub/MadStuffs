import User from "../models/user.js";
import jwt from "jsonwebtoken";
import {comparePassword,hashed} from "../utils/authUtils.js";
import mongodb from "mongodb";
import Post from "../models/post.js";
import Comment from "../models/comment.js";

const signUp=async(req,res)=>{
    try{
        
        const hashedPassword=await hashed(req.body.password,10)

        
        const user=await User.create({
            username:req.body.username,
            email:req.body.email,
            password:hashedPassword,
        })


        res.json({status:"ok",message:"Signed up successfully"})
    }catch(err){
        res.json({
            success:false,
            message:"Error has occurred"
        })
        console.log("test8")
    }
}


const signIn=async(req,res)=>{
    try{
        console.log(req.body)
        
        const found=await User.findOne({
            email:req.body.email,
        })
        console.log("test3")
        
        if(!found){
            return res.status(400).send({
                success:false,
                message:"Invalid email"
            })
            
        }

        //password check
        const passwordUser=await User.findOne({
            password:found.password
        })

        
        //post password
        const pass=req.body.password
        //saved password
        const match=await comparePassword(pass,passwordUser.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Invalid password"
            })
        }

        //Token creation
        try{
        const token=jwt.sign({
            username:found.username,
            password:found.password
        },process.env.JWT_SECRET)
        }catch(error){
            console.log(error)
            console.log("testing signin")
        }
        
        //Sends cookie
        res.cookie('jwt',token,{
            path:'/',
            expires:new Date(Date.now()+300000),
            httpOnly:true,
            sameSite:'lax'

        })
        
        //finally
        
        res.status(200).send({
            status:true,
            message:"Loggedin successfully",
        })
        
        
    }catch(err){
        console.log("Error in post api")
        res.status(500).send({
            success:false,
            message:"Error"
        })
    }
}

const newPost=async(req,res)=>{
    try{
        const post=await Post.create({
            title:req.body.title,
            content:req.body.content,
            author:req.body.author
        })

        res.json({status:"ok",message:"Post created successfully"})

    }catch(error){
        console.log("Error in post api")
        res.status(500).send({
            success:false,
            message:"Error"
        })
    }
}


const getData=async(req,res)=>{

    try {
        const searchQuery = req.query.search;
        if(searchQuery==""){
        const data=await Post.find()
        console.log(data)
        res.send(data)
        }else{
            const regexPattern = new RegExp(searchQuery, 'i');
            const data=await Post.find({ title: { $regex: regexPattern } })
            console.log(data)
            res.send(data)
        }
    } catch (error) {
        res.status(404).send({
            success:false,
            message:"Internal error"
        })
    }
    
}

const logOut=async(req,res,next)=>{
    res.clearCookie('jwt')

    res.status(200).send({
        success:true,
        message:"Logged-out"
    })
}

const logCheck=async(req,res,next)=>{
    try{
        const token=req.cookies.jwt
        console.log(token)
        if(!token){
            return res.json(false)
        }

        jwt.verify(token,process.env.JWT_SECRET)
        res.send(true)
        

    }catch(err){
        console.log(err)
        res.json(false)
    }
}

const getUser=(req,res)=>{

    try{
        const token=req.cookies.jwt
        console.log(process.env.JWT_SECRET)
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const username=decoded.username
        res.send(username)
        
    }catch(error){
        console.log("Got username")
        res.status(500).send({
            success:false,
            message:"Error"
        })
    }

}

const getEachData=async(req,res)=>{
    try {
        
        const data=await Post.findById(req.params.id).exec()
        res.send(data);

    } catch (error) {
        res.status(404).send({
            success:false,
            message:"Internal error"
        })
    }
}

const updateDetails=async(req,res)=>{
    try{
        const details=req.body
        console.log(details)
        const document=await Post.findById(details.id)
        const updatedDocument = await Post.findByIdAndUpdate(details.id, details, { new: true });
        console.log(updatedDocument)

    }catch(error){
        res.status(404).send({
            success:false,
            message:"Internal error"
        })
    }

}
const commentDetails=async(req,res)=>{

        const details=req.body
        const id=req.params.id
        try{
        const data=await Comment.create({
            name:details.name,
            post_id:id,
            email:details.email,
            comment:details.comment
        })

        res.json({status:"ok",message:"Comment created successfully"})
        
    }catch(error){
        res.status(404).send({
            success:false,
            message:"Internal error"
        })
    }
}

const getComments=async(req,res)=>{
    try{
        const id=req.params.id
        const details=await Comment.find({post_id:id})
        res.send(details)
    }catch(error){
        res.status(404).send({
            success:false,
            message:"Internal error"
        })
    }
}

const deletePost=async(req,res)=>{
    try{
        const id=req.params.id
        const data = await Post.deleteOne({ _id: id })
        res.json({ status: "ok", message: "Post deleted successfully" });

    }catch(error){
        res.status(404).send({
            success:false,
            message:"Internal error"
        })
    }
}

const check=(req,res)=>{
    res.json({"message":"Welcome"})
}

export {signUp,signIn,deletePost,check,getComments,commentDetails,updateDetails,newPost,getEachData,getData,getUser,logOut,logCheck};
