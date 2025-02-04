import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.routes.js"
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";
dotenv.config({});
const app=express();
app.get("/home",(req,res)=>{
    return res.status(200).json({
        messege:"i am coming from backend",
        success:true
    })
})
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
const corsOption={
    origin:"http://localhost:5173",
    credentials:true
}
app.use(cors(corsOption));
const PORT=process.env.PORT || 3000;
app.use("/api/v1/user",userRoute)
app.use("/api/v1/company",companyRoute)
app.use("/api/v1/job",jobRoute)
app.use("/api/v1/application",applicationRoute)

const __dirname1= path.resolve();


if(process.env.NODE_ENV=="development"){
  console.log("Reached here");
  app.use(express.static(path.join(__dirname1,"/frontend/dist")));
  console.log("\n\n\n\n");
  console.log(__dirname1);
  console.log("\n\n\n\n");
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname1,"frontend","dist","index.html"))
  })
  console.log("Inside deployment code");

}else{
  app.get('/',(req,res)=>{
    res.send("Welcome to JobPortal !!!");
  })
}
// --------------------- deployment ------------------------

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});

