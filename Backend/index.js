const express = require('express')
const mainRouter = require("./src/routers/index")
const { PORT } = require('./src/config/configs')
const dbConnect = require('./src/config/dbConnect')


const app = express()

//middlewere
app.use(express.json())
app.use('/', mainRouter)

app.listen(PORT, ()=>{
    console.log(`server is running on port:" ${PORT}`);
    
})
dbConnect()