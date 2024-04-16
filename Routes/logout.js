const express = require('express')
const router = express.Router()
const {handleLogout} = require('../Controllers/logout')
const verifyjwt = require("../middleware/verifyJWT")

router.post("/" ,handleLogout)
module.exports = router;