const express = require('express')
const router = express.Router()
const registerAdminController = require('../Controllers/registerAdmin')

router.post("/", registerAdminController.handleAdmin)
module.exports = router;