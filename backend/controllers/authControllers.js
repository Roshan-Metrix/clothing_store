import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";


export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res
        .status(400)
        .json({ status: false, message: "Missing Details" });

    const existingUser = await userModel.findOne({ email });

    if (existingUser)
      return res
        .status(400)
        .json({ status: false, message: "User Already Registered" });

    const hashedPassword = await bcrypt.hash(password,10)

    const user = new userModel({
      name,
      email,
      password:hashedPassword
    });

    await user.save();
    
    //Generating Token
    if(user){
      generateToken(user._Id,res)
    }
    

    res.status(201).json({ status: true, message: "User Registered Successfully", user });
  } catch (error) {
    console.log('Error in Signup : '+ error.message)
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password} = req.body;

  if(!email || !password){
    return res.status(400).json({status:false,message:'Missing Details'})
  }
   
  try{
     
    const user = await userModel.findOne({email});

    if(user){
      const isMatch = await bcrypt.compare(password,user.password)
      if(isMatch){
        generateToken(user._id,res)
        return res.status(200).json({status:true,message:'Login Success'})
      }else{
        return res.status(400).json({status:false,message:'Invalid Credentials'})
      }
    }else{
      return res.status(400).json({status:false,message:'Please register first'})
    }

  }catch(error){
    console.log("Error in Login Auth:"+error.message);
    return res.status(500).send({success:false,message:error.message})
  }
};

export const logout = async (req, res) => {
  try{

     res.clearCookie("token",{
      httpOnly:true,
      secure:process.env.NODE_ENV === "production",
      sameSite:process.env.NODE_ENV === "production" ? "none" : "strict"
     })

     return res.status(200).json({
      success:true, message: "Logged Out" });

  } catch(error){
    console.log("Error in logout:"+error.message)
    return res.status(500).json({success:false,message:error.message})
  }
};

export const isAuth = async (req,res) => {
  
}

