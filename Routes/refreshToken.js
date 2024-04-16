const express = require('express')
const router = express.Router()
const refreshController = require('../Controllers/refreshToken')

router.get("/", refreshController.handleRefreshToken)
module.exports = router;