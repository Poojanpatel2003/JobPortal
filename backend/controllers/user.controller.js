import { User } from "../models/user_model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import getDataUri from "../utils/dataURI.js";
import cloudinary from "../utils/cloudinary.js"
export const register=async(req,res)=>{
try {
    const {fullname,email,phoneNumber,password,role}=req.body;
    
    if(!fullname || !email || !phoneNumber || !password || !role ){
        return res.status(400).json({message:"Please fill in all fields",
            SUCCESS:false
        });
    }
    const file=req.file;
    const fileUri=getDataUri(file);
    const cloudResponse=await cloudinary.uploader.upload(fileUri.content)
    const user=await User.findOne({email});
    if(user){
        return res.status(400).json({message:"Email already exists",
    })
    }
    const hashedPassword=await bcrypt.hash(password,10);
    await User.create({
        fullname,
        email,
        phoneNumber,
        password:hashedPassword,
        role,
        profile:{
            profilePhoto:cloudResponse.secure_url,
        }
        
    });
    return res.status(201).json({
        message:"account created succesfully",
        SUCCESS:true
    })
}
 catch (error) {
    console.log(error);
}
}
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Validate input fields
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Please fill in all fields",
                SUCCESS: false,
            });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect Email or password",
                SUCCESS: false,
            });
        }

        // Ensure the user's password exists in the database
        if (!user.password) {
            console.log("User password is undefined in the database.");
            return res.status(500).json({
                message: "User password not found in the database",
                SUCCESS: false,
            });
        }

        // Compare passwords
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect Email or password",
                SUCCESS: false,
            });
        }

        // Validate role
        if (role !== user.role) {
            return res.status(400).json({
                message: "Incorrect role",
                SUCCESS: false,
            });
        }

        // Generate token
        const tokenData = { UserId: user._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });

        const userData = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
                httpOnly: true,
                sameSite: "strict",
            })
            .json({
                message: `Welcome back ${user.fullname}`,
                User: userData,
                SUCCESS: true,
            });
    } catch (error) {
        console.log("Error during login:", error);
        res.status(500).json({ message: "Internal Server Error", SUCCESS: false });
    }
};

export const logout=async(req,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged out Successfully",
            SUCCESS:true
        })
    } catch (error) {
        console.log(error)
    }
}
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const file = req.file;

        if (!req.id) {
            return res.status(401).json({ message: "Unauthorized", SUCCESS: false });
        }

        const userId = req.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", SUCCESS: false });
        }

        // Handle file upload
        let resumeUrl, resumeOriginalName;
        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                folder: "resumes", // Optional folder name
            });
            resumeUrl = cloudResponse.secure_url;
            resumeOriginalName = file.originalname;
        }

        // Parse skills to array
        const skillsArray = skills ? skills.split(",").map((skill) => skill.trim()) : user.profile.skills;

        // Update fields
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skillsArray) user.profile.skills = skillsArray;
        if (resumeUrl) {
            user.profile.resume = resumeUrl;
            user.profile.resumeOriginalName = resumeOriginalName;
        }

        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            User: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile,
            },
            SUCCESS: true,
        });
    } catch (error) {
        console.error("Error in updateProfile:", error);
        res.status(500).json({ message: "Internal Server Error", SUCCESS: false });
    }
};

