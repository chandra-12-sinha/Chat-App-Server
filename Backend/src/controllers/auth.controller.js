const User = require("../models/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_PRIVATE_KEY, NODE_ENV } = require("../config/configs");
const cloudinary = require("cloudinary").v2
// const { ACCESS_TOKEN_PRIVATE_KEY } = require("../config/configs");
 
 const signupController = async (req, res) =>{
    const {fullName, email, password} = req.body;

    try {
if(!fullName || !email || !password){
    return res.status(400).json({message: "All fields are required"})
}

        if(password.length < 6){
            return res.status(400).json({message: "Password must be at least 6 characters"})
        }

        const user = await User.findOne({email})

        if(user){
            return res.status(409).json({message: "Email already exists"})
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullName,
			email,
			password: hashedPassword,
		});
        if (newUser) {
            //generate jwt token 
            generateAccessToken(newUser._id, res)

            await newUser.save()
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic: newUser.profilePic
            })
        } else {
            res.status(400).json({message:"invalid user data"})
        }



    } catch (err) {
        console.log("error in signup controller", err.message);
        res.status(500).json({message:"internal server error"})
    }
  
}
const loginController=  async (req, res) =>{
    const {email, password} = req.body

    try {
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({message: "user is not registered"})
        }

        const isPasswordConnrect = await bcrypt.compare(password, user.password)

        if(!isPasswordConnrect){
            return res.status(400).json({message:"incorrect passwsord" })
        }
        
        generateAccessToken(user._id, res)
        await user.save()

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            password:user.password

        })
   
    } catch (err) {
        console.log("error in login controller ", err.message);
        res.status(500).json({message: "server error"})
        
    }
}






const logoutController = (req, res) =>{
 try {
    res.cookie("jwt", "", {maxAge:0})
    res.status(200).json({message: "logged out seccessfully"})
 } catch (err) {
    console.log("error in loggedout controller ", err.message);
    res.status(500).json({message: "server error"})
    
 }


   
}


const generateAccessToken = async (userId, res) => {
	try {
		const token = jwt.sign({userId}, ACCESS_TOKEN_PRIVATE_KEY, {
			expiresIn: '7d',
		});
        
      res.cookie("jwt", token, {
        // maxAge: 7 = 24*60*60*1000,
        httpOnly: true,
        sameSite:"strict",
        secure:NODE_ENV !== "development"
      })
      return token
	} catch (err) {
		// return res.status(500).send(err.message);
		console.log(err.message);
	}
};

const updateprofile = async ()=>{
    try {
        const {profilePic} = req.body;
        const userId = req.user._id;
        
        if(!profilePic){
            return res.status(400).json({message:"profile pic is required"})
        }
      const uploadResponse =  await cloudinary.uploader.upload(profilePic)
      const updateUser = await User.findByIdAndUpdate(
        userId,
        {profilePic: uploadResponse.secure_url},
        {new:true}
      )
      es.status(200).json(updateUser)
    } catch (err) {
        console.log("error in update profile", err.message);
        res.status(500).json({message: "internal server error"})
        
        
    }
}

const checkAuth = (req, res)=>{
    try {
        res.status(200).json(req.user)
    } catch (err) {
        console.log("error in checkAuth controller ", err.message)
        res.status(500).json({message: "internal server error"})
        
        
    }
}



module.exports = {
    signupController,
    loginController,
    logoutController,
    updateprofile,
    checkAuth
}