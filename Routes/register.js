const express = require('express')
const router = express.Router()
const {handleNewUser} = require('../Controllers/register')

router.post("/", handleNewUser)
module.exports = router;