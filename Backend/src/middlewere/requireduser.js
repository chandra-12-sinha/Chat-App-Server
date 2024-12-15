const jwt = require("jsonwebtoken")
const User = require("../models/User")
const { ACCESS_TOKEN_PRIVATE_KEY } = require("../config/configs")

module.exports = async(req, res, next)=>{
    try {
        const token = req.cookies.jwt

        if(!token){
         return res.status(401).json({message: "unauthorized- no token provided"})
        }
 
        const decoded = jwt.verify(token, ACCESS_TOKEN_PRIVATE_KEY)
 
        if(!decoded){
         return res.status(401).json({message: "unauthorized- invalid token"})
        }
 
        const user = await User.findById(decoded.userId).select("-password")
 
        if(!user){
         return res.status(404).json({message:"user not found"})
        }
        req.user = user
        next()
    } catch (err) {
        console.log("error in protectRoute m,oddlewere", err.message);
        res.status(500).json({message:"internal server error"})
        
    }
}