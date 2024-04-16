const express = require('express')
const adminsRoute = express.Router()
const { getAllAdmins, getById, saveAdmin, updateAdminById, deleteAdmin } = require('../Controllers/adminsController')

adminsRoute.get('/alldata', getAllAdmins)

adminsRoute.get('/getById/:id', getById)

adminsRoute.post('/create', saveAdmin)

adminsRoute.patch('/update/:id', updateAdminById)

adminsRoute.delete('/delete/:id', deleteAdmin)

module.exports =  adminsRoute 

