const mongoose = require('mongoose')

const subCategoriesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "category",
        require: true
    }
}, { timestamps: true })

const subCategoriesModel = mongoose.model("sub-Category", subCategoriesSchema)

module.exports = subCategoriesModel
