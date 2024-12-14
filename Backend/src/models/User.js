const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
            unique:true
        },
        fullName:{
            type:String,
            required: true
        },
        password:{
            type:String,
            required:true,
            minlength:6
        },
        profilePic:{
            type:String,
            default:''
        },
     
    },   {
        timestamp: true
    }
)

module.exports = mongoose.model("chat", UserSchema)