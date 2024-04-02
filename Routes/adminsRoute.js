const { getAllAdmins, getById, saveAdmin, updateAdminById, deleteAdmin } = require('../Controllers/adminsController')

const express = require('express')

const router = express.Router();

router.get('/alldata', getAllAdmins)

router.get('/getById/:id', getById)

router.post('/create', saveAdmin)

router.patch('/update/:id', updateAdminById)

router.delete('/delete/:id', deleteAdmin)

module.exports = router 

