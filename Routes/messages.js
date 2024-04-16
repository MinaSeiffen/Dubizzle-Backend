const express = require('express');
const { getMessage, sendMessage } = require('../Controllers/messages.js');
const verifyJWT = require("../middleware/verifyJWT.js");

const router = express.Router()

router.post("/send/:id" , verifyJWT , sendMessage)
router.get("/:id" , verifyJWT , getMessage)

module.exports =router