const express = require('express')
const router = express.Router()
const {handleLoginOrRegister , handleLogin} = require('../Controllers/login')

router.post("/" ,handleLoginOrRegister)
router.post("/email-password", handleLogin);
module.exports = router;