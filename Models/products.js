const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: String, required: true },
    images: {
      type: [String],
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    price_type: String,
    location: {
      type: String,
      default: "",
      required: true,
    },
    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sub-categories",
      required: true,
    },
    contact_type: String,
    phoneNumber: String,
    propertyType: String,
    area: String,
    amenities: [String],
    bedRooms: String,
    bathRooms: String,
    model: String,
    brand: String,
  },
  { timestamps: true }
);

const productModel = mongoose.model("product", productSchema);

module.exports = { productModel };
