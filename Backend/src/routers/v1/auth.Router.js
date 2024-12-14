const  { loginController, logoutController, signupController } = require ("../../controllers/auth.controller");


const router = require ("express").Router() 

router.post("/signup", signupController)
router.post('/login', loginController)
router.post('/logout', logoutController)

module.exports = router;
