import {Company} from "../models/company.model.js";
import getDataUri from "../utils/dataURI.js";
import cloudinary from "../utils/cloudinary.js"
export const registerCompany=async(req,res)=>{
    try {
        const {companyName} =req.body;
        if(!companyName){
            return res.status(400).json({
                message:"Company name is required",
                SUCCESS:true
            })
        }   
        let company=await Company.findOne({name:companyName});
        if(company){
            return res.status(400).json({message:"You can't add same company",
                SUCCESS:false})
        }
        company=await Company.create({
            name:companyName,
            userId:req.id,

        })
        return res.status(201).json({
            message:"Company registered succesfully",
            company,
            SUCCESS:true
        })
    } catch (error) {
        console.log(error);
    }
}
export const getCompany=async(req,res)=>{
    try {
        const userId=req.id;
        const companies=await Company.find({userId});
        if(!companies){
            return res.status(404).json({message:"No company found",SUCCESS:false})
        }
    return res.status(200).json({
        companies,
        SUCCESS:true
    })
    } catch (error) {
        console.log(error);
    }
}

export const getCompanyById=async(req,res)=>{
    try {
        const companyId=req.params.id;
        const company=await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                message:"Company not found",
                SUCCESS:false
            })
        }
        return res.status(200).json({
            company,
            SUCCESS:true
        })
    } catch (error) {
        console.log("this error from getcomapnybyid");
    }
}

export const updateCompany=async(req,res)=>{
    try {
        const {name,description,website,location}=req.body;
        const file=req.file;
        const fileUri=getDataUri(file);
        const cloudResponse= await cloudinary.uploader.upload(fileUri.content);
        const logo=cloudResponse.secure_url;
        const updateDate={name,description,website,location,logo};
        const company=await Company.findByIdAndUpdate(req.params.id,updateDate,{new:true});
        if(!company){
            return res.status(404).json({message:"company not found",
                SUCCESS:false});

        }
        return res.status(200).json({
           
            message:"Company information updated!",
            SUCCESS:true
        })
    } catch (error) {
        console.log(error);
    }
}