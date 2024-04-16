const express = require('express')
const router = express.Router()
const logoutAdminController = require('../Controllers/logoutAdmin')

router.get("/", logoutAdminController.handleAdminLogout)
module.exports = router;