const router = require('express').Router()
const authRouter = require('./auth.Router')

router.use('/auth', authRouter)

module.exports = router