const express = require('express')
const routerSubCategory = express.Router()
const { getAllSubCategories, updateSubCategory, deleteSubCategory, getAllProductOfSubCategory, addSubCategory, getCategoryByName , getCategoryById } = require('../Controllers/sub-categories')
const verifyJWT = require('../middleware/verifyJWT')

routerSubCategory.post('/' ,addSubCategory)
routerSubCategory.get('/',getAllSubCategories)
routerSubCategory.get('/:subCatName',getCategoryByName)
routerSubCategory.get('/getId/:id',getCategoryById)
routerSubCategory.get('/id/:id',getAllProductOfSubCategory)
routerSubCategory.delete('/:id', verifyJWT ,deleteSubCategory)
routerSubCategory.patch('/:id', verifyJWT ,updateSubCategory)

module.exports = routerSubCategory

