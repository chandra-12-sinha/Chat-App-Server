const { getMessages } = require("../../controllers/message.controller");
const requireduser = require("../../middlewere/requireduser");

const router = require ("express").Router() 

router.get("/users", requireduser, getUsersForSidebar)
router.get("/:id", requireduser, getMessages)

module.exports = router;
