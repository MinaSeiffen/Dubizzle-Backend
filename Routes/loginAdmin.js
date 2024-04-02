const express = require('express')
const router = express.Router()
const loginAdminController = require('../Controllers/loginAdmin')

router.post("/", loginAdminController.handleAdminLogin)
module.exports = router;