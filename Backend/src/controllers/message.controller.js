const Message = require("../models/Message");
const User = require("../models/User");
const cloudinary = require("cloudinary").v2

const getUsersForSidebar = async (req, res)=>{
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password")

        res.status(200).json(filteredUsers)
    } catch (err) 
    {
        console.log("error in getUserForSidebar controller", err.message);
        res.status(500).json({message:"internal server error"})
    }
}

const getMessages = async(req, res)=>{
    try {
        const {id:userToChatId} = req.params
        const myId= req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}

            ]
        })
        res.status(200).json(messages)
    } catch (error) {
        console.log("error in getmeswsage controller", err.message);
        res.status(500).json({message:"internal server error"})
    }
}

const sendMessage = async(req, res) =>{
    try {
        const {text, image }= req.body;
        const {id: receiverId}= req.params
        const senderId = req.user._id

        let imageUrl;
        if(image){
            const uploadResponse= await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })
        await newMessage.save()
        res.status(201).json(newMessage)



    } catch (error) {
        console.log("error in sendmeswsage controller", err.message);
        res.status(500).json({message:"internal server error"})
    }
}

module.exports = {
    getUsersForSidebar,
    getMessages
}