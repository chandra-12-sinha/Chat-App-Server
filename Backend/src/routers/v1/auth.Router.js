const  { loginController, logoutController, signupController, checkAuth, updateprofile } = require ("../../controllers/auth.controller");
const requireduser = require("../../middlewere/requireduser");
// const { protectRoute } = require("../../middlewere/auth.middlewere");


const router = require ("express").Router() 

router.post("/signup", signupController)
router.post('/login', loginController)
router.post('/logout', logoutController)

router.put("/updateprofile",requireduser, updateprofile)
router.get("/check",requireduser, checkAuth)

module.exports = router;
