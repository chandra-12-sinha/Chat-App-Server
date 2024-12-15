const router = require('express').Router()
const authRouter = require('./auth.Router')
const messageRouter = require("./message.Router")


router.use('/auth', authRouter)
router.use("/message", messageRouter)
 
module.exports = router