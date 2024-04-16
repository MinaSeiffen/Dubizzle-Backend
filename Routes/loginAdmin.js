const express = require('express')
const router = express.Router()
const loginAdminController = require('../Controllers/loginAdmin')

router.post("/", loginAdminController.handleAdminLogin)
// router.post("/", (req, res, next) => {
//     console.log(req.body)
//     res.status(200).json({ res: "log in functin " })
// })

module.exports = router;