const mongoose = require('mongoose');

const shoppingSchema = mongoose.Schema({
    "user_id": {
        type: Number,
        required: true,
    }
    , "items": [{
        "product_id": {
            type: Number,
            required: true,
        },
        "quantity": {
            type: Number,
            required: true,
        },
        _id: false
    }],

}, { timestamps: true }, { collection: 'shopping' });

const ShoppingModel = mongoose.model("shopping", shoppingSchema)

module.exports = { ShoppingModel }

// { "user_id":1,"items":[{"product_id":3,"quantity":300}]}