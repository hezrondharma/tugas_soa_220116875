const express = require('express')
const { getAll,login, register, editProfile } = require("../controllers/user");
const router = express.Router()

router.get("/user",getAll)
router.post("/user",register)
router.post("/login",login)
router.put("/user/:username", editProfile)



module.exports = router