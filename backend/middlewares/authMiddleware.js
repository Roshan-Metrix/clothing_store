import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';

export const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken)
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No access token provided",
      });

    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

      const user = await userModel.findById(decoded.id).select("-password");

      if (!user)
        return res
          .status(401)
          .json({ success: false, message: "User not found" });

      req.user = user;

      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Unauthorized - Access token expired" });
      }
      throw error;
    }
  } catch (error) {
    console.log("Error in protectRoute middleware : ", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

export const adminRoute = async (req,res,next) => {
    if(req.user && req.user.role === 'admin'){
        next();
    }else{
        return res.status(403).json({ success: false, message:"Access denied - Admin only"});
    }
}
