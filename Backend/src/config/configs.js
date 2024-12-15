const dotenv = require("dotenv").config()



const configs = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    ACCESS_TOKEN_PRIVATE_KEY: process.env.ACCESS_TOKEN_PRIVATE_KEY,
    NODE_ENV: process.env.NODE_ENV,

    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY :process.env.CLOUDINARY_API_KEY, 
    CLOUDINARY_API_SECRET:process.env.CLOUDINARY_API_SECRET
}

module.exports = configs