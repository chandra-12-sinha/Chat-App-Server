const express = require('express')
const mainRouter = require("./src/routers/index")
const { PORT, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = require('./src/config/configs')
const dbConnect = require('./src/config/dbConnect')
const  cloudinary = require("cloudinary").v2
const cookieParser = require('cookie-parser')


const app = express()
// Configure cloudinary
cloudinary.config({
	cloud_name: CLOUDINARY_CLOUD_NAME,
	api_key:  CLOUDINARY_API_KEY ,
	api_secret:  CLOUDINARY_API_SECRET,
});

//middlewere
app.use(express.json())
app.use(cookieParser())

app.use('/', mainRouter)

app.listen(PORT, ()=>{
    console.log(`server is running on port:" ${PORT}`);
    
})
dbConnect()