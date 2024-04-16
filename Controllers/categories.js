const { categoryModel } = require('../Models/categories')
const { productModel } = require("../Models/products")

const getAllCategories = async (req, res, next) => {
    try {
        const allCategories = await categoryModel.find()
        res.status(201).json(allCategories)
    }
    catch (err) {
        res.status(401).json({ MSG: "there is something wrong in catogeries" })
    }
}

const updateCategory = async (req, res, next) => {
    const id = req.params.id;
    const updates = req.body
    try {
        let category = await categoryModel.findByIdAndUpdate(id, updates, { new: true, runValidator: true })
        res.status(201).json({ MSG: "Update Successfully", Updated_Category: category })
    }
    catch (err) {
        res.status(401).json({ MSG: "can not update that Category maybe there is something wrong in Category ID" })
    }
}

const deleteCategory = async (req, res, next) => {
    let id = req.params.id
    try {
        let category = await categoryModel.findByIdAndDelete(id)
        res.status(201).json({ MSG: "Your selected Category is now delete." })
    }
    catch (err) {
        res.status(401).json({ MSG: "can not delete your selected Category" })
    }
}

const getAllProductsOfCategory = async (req, res, next) => {
    const id = req.params.id;
    try {
        const categoryProducts = await productModel.find({ categoryId: id })
        res.status(201).json({ categoryId: id, Products: categoryProducts })
    }
    catch (err) {
        res.status(401).json({ MSG: "that category id is not found" })
    }
}

const postCategory = async (req, res, next) => {
    let cat = req.body
    try {
        console.log(cat)
        const newCategory = await categoryModel.create(cat)
        res.status(201).json({ MSG: "category added", category: newCategory })
    }
    catch (err) {
        res.status(401).json({ MSG: "there is something wrong in inserting categories" + err })
    }
};


module.exports = { getAllCategories, getAllProductsOfCategory, postCategory, deleteCategory, updateCategory }
