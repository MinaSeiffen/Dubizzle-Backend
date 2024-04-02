const { getAllCategories, getAllProductsOfCategory, postCategory, deleteCategory, updateCategory } = require('../Controllers/categories')
const express = require("express");
const verifyJWT = require('../middleware/verifyJWT')
const router = express.Router();

router.get('/' , getAllCategories)
router.get('/:id/products' , getAllProductsOfCategory)
router.post('/' , postCategory) 
router.patch("/:id" , verifyJWT , updateCategory) 
router.delete("/:id" , verifyJWT , deleteCategory) 

module.exports = router
