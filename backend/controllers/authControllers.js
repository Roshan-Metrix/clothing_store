import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { redis } from "../lib/redis.js";
import bcrypt from "bcryptjs";
import { generateTokens, setCookies, storeRefreshToken } from "../lib/utils.js";
import dotenv from 'dotenv'
dotenv.config({quiet: true});
 
export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password)
      return res
        .status(400)
        .json({ status: false, message: "Missing Details" });

    const existingUser = await userModel.findOne({ email });

    if (existingUser)
      return res
        .status(400)
        .json({ status: false, message: "User Already Registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Generate Tokens
   const { accessToken, refreshToken } = generateTokens(user._id, res);

   // Store refresh token in Redis
    await storeRefreshToken(res, user._id, refreshToken);

    // Set cookies
    setCookies(res, accessToken, refreshToken);

    res
      .status(201)
      .json({ status: true, message: "User Registered Successfully", user:{
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      } });

  } catch (error) {
    console.log("Error in Signup : " + error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ status: false, message: "Missing Details" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
       // Generate Tokens
   const { accessToken, refreshToken } = generateTokens(user._id, res);

   // Store refresh token in Redis
    await storeRefreshToken(res, user._id, refreshToken);

    // Set cookies
    setCookies(res, accessToken, refreshToken);

        return res.status(200).json({ status: true, message: "Login Success", user:{
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }});
      } else {
        return res
          .status(400)
          .json({ status: false, message: "Invalid Credentials" });
      }
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Please register first" });
    }
  } catch (error) {
    console.log("Error in Login Controller:" + error.message);
    return res.status(500).send({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(400).json({ success: false, message: "Tokens not found" });
    }

    if (refreshToken) {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      await redis.del(`refresh_token:${decoded.userId}`);
    }

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

    return res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  } catch (error) {
    console.log("Error in logout:" + error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// This will refresh the access token using the refresh token
export const refreshToken = async (req, res) => {
  try{
   const refreshToken = req.cookies.refreshToken;
   
   if(!refreshToken){
    return res.status(401).json({message:"No refresh token provided" });
   }

   const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

   console.log(decoded.userid);

   const storedToken = await redis.get(`refresh_token:${decoded.userId}`);

   console.log(storedToken)

   if(storedToken !== refreshToken){
    return res.status(401).json({ message:"Invalid refresh token" });
   }

   const accessToken = jwt.sign({ userId: decode.userId}, process.env.ACCESS_TOKEN_SECRET,{expiresIn: "15m"})
 
   res.cookie("accessToken", accessToken,{
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000
   })

   res.status(201).json({ status: true, message: "Token refreshed successfully", 
      });

  }catch (error) {
    console.log("Error in refreshToken controllers : " + error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const isAuth = async (req, res) => {

};


