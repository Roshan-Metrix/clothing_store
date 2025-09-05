import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateTokens, setCookies, storeRefreshToken } from "../lib/utils.js";

 
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

        return res.status(200).json({ status: true, message: "Login Success" });
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
    console.log("Error in Login Auth:" + error.message);
    return res.status(500).send({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
const refreshToken = req.cookies.refreshToken;
const accessToken = req.cookies.accessToken;

if(!refreshToken || !accessToken){
  return res.status(400).json({success:false,message:"Tokens not found"});
}

    res.clearCookie("accessToken",accessToken, {
    httpOnly: true, // prevent XSS attacks, cross site scripting attack
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // prevent CSRF attack, cross site request forgery attack
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.clearCookie("refreshToken",refreshToken, {
    httpOnly: true, // prevent XSS attacks, cross site scripting attack
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // prevent CSRF attack, cross site request forgery attack
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

    return res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  } catch (error) {
    console.log("Error in logout:" + error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const isAuth = async (req, res) => {};
