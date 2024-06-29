import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//import adminRoutes from './routes/adminRoutes.js'
const app=express();
//cors 
app.use(cors({
  origin: 'https://mad-stuffs.vercel.app', 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));

//This converts request body to json 
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//cookie parser(if not used,cookies will be undefined)
app.use(cookieParser())

//body parser(To view in postman)
app.use(bodyParser.json())

//User
app.use("/",userRoutes)


// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
    try{
    res.json({ message: 'File uploaded successfully',name:req.file.filename});
    }catch(error){
    console.log(error);
    }
});

//serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

export default app