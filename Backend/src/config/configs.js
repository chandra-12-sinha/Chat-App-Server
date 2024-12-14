const dotenv = require("dotenv").config()


const configs = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    ACCESS_TOKEN_PRIVATE_KEY: process.env.ACCESS_TOKEN_PRIVATE_KEY,
    NODE_ENV: process.env.NODE_ENV
}

module.exports = configs