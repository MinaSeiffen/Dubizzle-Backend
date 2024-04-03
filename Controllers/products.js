const { productModel } = require("../Models/products");
const { subCategoriesModel } = require("../Models/sub-categories");

const getProduct = async (req, res, next) => {
    const { id } = req.params;
    try {
        const product = await productModel.findById({ _id: id }).populate({
            path: "sellerId",
            select: "-refreshToken",
        });
        res.status(200).json({ product });
    } catch (err) {
        res
            .status(500)
            .json({ error: "Something went wrong while fetching the product." });
    }
};

const getAllProducts = async (req, res, next) => {
    try {
        console.log(req.user);
        console.log(req.roles);
        const products = await productModel.find({});
        res.status(201).json(products);
    } catch (err) {
        res
            .status(401)
            .json({ MSG: "There is something went wrong in getting all proucts" });
    }
};

const getProductsBySearch = async (req, res, next) => {
    try {
        const searchQuery = req.query.name ? req.query.name.toLowerCase() : "";
        const locationQuery = req.query.location
            ? req.query.location.toLowerCase()
            : "";
        const priceRangeQuery = req.query.priceRange ? req.query.priceRange : "";

        const sortedSearchQuery = searchQuery
            .split(" ")
            .map((word) => word.split("").sort().join(""))
            .join(" ");

        const products = await productModel.find().lean();

        const matchedProducts = products.filter((product) => {
            const sortedProductName = product.name
                .toLowerCase()
                .split(" ")
                .map((word) => word.split("").sort().join(""))
                .join(" ");

            const nameMatch = sortedProductName.includes(sortedSearchQuery);

            const locationMatch =
                !locationQuery ||
                product.location.toLowerCase().includes(locationQuery);

            let priceMatch = true;
            if (priceRangeQuery) {
                const [minPrice, maxPrice] = priceRangeQuery.split("-").map(Number);
                if (minPrice && product.price < minPrice) {
                    priceMatch = false;
                }
                if (maxPrice && product.price > maxPrice) {
                    priceMatch = false;
                }
            }

            return nameMatch && locationMatch && priceMatch;
        });

        res.json({ matchedProducts: matchedProducts });
    } catch (error) {
        res.json({ error: error.message });
    }
};

const getProductsBySearchInProperties = async (req, res, next) => {
    try {
        const { subCategoryName } = req.params;
        const {
            location = "",
            bedRooms = "",
            bathRooms = "",
            area = "",
            rangePrice = "",
        } = req.query;

        const subCategory = await subCategoriesModel.findOne({
            name: subCategoryName,
        });
        if (!subCategory) {
            return res.status(404).json({ error: "Subcategory not found" });
        }

        const products = await productModel
            .find({ subCategoryId: subCategory._id })
            .lean();

        const matchedProducts = products.filter((product) => {
            const productLocation = product.location?.toLowerCase();
            const productBedRooms = product.bedRooms?.toString().toLowerCase();
            const productBathRooms = product.bathRooms?.toString().toLowerCase();
            const productArea = product.area;

            const locationMatch =
                !location || productLocation.includes(location.toLowerCase());

            let bedRoomsMatch = true;
            if (bedRooms) {
                const bedRoomsArray = bedRooms.split(',').map(room => room.trim());
                bedRoomsMatch =
                    bedRoomsArray.length === 0 ||
                    bedRoomsArray.includes(productBedRooms);
            }

            let bathRoomsMatch = true;
            if (bathRooms) {
                const bathRoomsArray = bathRooms.split(',').map(room => room.trim());
                bathRoomsMatch =
                    bathRoomsArray.length === 0 ||
                    bathRoomsArray.includes(productBathRooms);
            }

            let areaMatch = true;
            if (area) {
                const [minArea, maxArea] = area.split("-").map((value) => {
                    if (isNaN(value)) return value;
                    return parseInt(value);
                });

                if (minArea > 0 && maxArea === 0) {
                    areaMatch = true;
                } else if (minArea > 0 && isNaN(maxArea)) {
                    areaMatch = productArea >= minArea;
                } else if (minArea === 0 && maxArea < Infinity) {
                    areaMatch = productArea <= maxArea;
                } else if (minArea > 0 && maxArea > 0) {
                    areaMatch = productArea >= minArea && productArea <= maxArea;
                }
            }

            let priceMatch = true;
            if (rangePrice) {
                const [minPrice, maxPrice] = rangePrice.split("-").map(Number);
                if (minPrice === 0 && isNaN(maxPrice)) {
                    priceMatch = true;
                } else if (minPrice > 0 && isNaN(maxPrice)) {
                    priceMatch = product.price >= minPrice;
                } else if (minPrice >= 0 && maxPrice > 0) {
                    priceMatch = product.price >= minPrice && product.price <= maxPrice;
                }
            }

            return locationMatch && bedRoomsMatch && bathRoomsMatch && areaMatch && priceMatch;
        });

        res.json({ matchedProducts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const postProduct = async (req, res, next) => {
    const data = req.body;
    const userID = req.userId;
    console.log(data, userID);
    try {
        const newProduct = new productModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            images: req.body.images,
            sellerId: userID,
            price_type: req.body.price_type,
            location: req.body.location,
            subCategoryId: req.body.subCategoryId,
            contact_type: req.body.contact_type,
            phoneNumber: req.body.phoneNumber,
            propertyType: req.body.propertyType,
            area: req.body.area,
            amenities: req.body.amenities,
            bedRooms: req.body.bedRooms,
            bathRooms: req.body.bathRooms,
            brand: req.body.brand,
            model: req.body.model,
        });
        await newProduct.save();
        res.status(201).json({ success: 1, product: newProduct });
    } catch (err) {
        res
            .status(400)
            .json({ MSG: "there is something wrong in your inserted data" });
    }
};

const updateProduct = async (req, res, next) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const updatedProduct = await productModel.findOneAndUpdate(
            { _id: id },
            updates,
            { new: true, runValidators: true }
        );
        res
            .status(201)
            .json({ MSG: "Update Succesfully", UpdatedProduct: updatedProduct });
    } catch (err) {
        res.status(401).send("Something Went Wrong in updating");
    }
};

const deleteProduct = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedProduct = await productModel.deleteOne({ _id: id });
        res.json({ MSG: `Your selected product with id : ${id} is now deleted` });
    } catch (err) {
        res.json({ MSG: "Can not delete your selected product please try again" });
    }
};
const deleteAllProductWithIdSeller = async (req, res, next) => {
    const { idSeller } = req.params;
    try {
        const deletedProduct = await productModel.deleteMany({ sellerId: idSeller });
        res.json({ MSG: `all product with sellerId : ${idSeller} is now deleted` });
    } catch (err) {
        res.json({ MSG: "Can not delete your selected products please try again" });
    }
};
const getProdBySub_CategoryName = async (req, res, next) => {
    const { sub_category } = req.body;
    if (!sub_category) res.json({ Msg: "enter sub category name" });
    try {
        const productData = await productModel.find({ subCategory: sub_category });
        res.json(productData);
    } catch (error) {
        res.json(error);
    }
};

const getSellerAds = async (req, res, next) => {
    const { userId } = req.params;
    if (!userId) res.json({ Msg: "please send user ID" });
    try {
        const Ads = await productModel.find({ sellerId: userId });
        res.json({ Ads: Ads });
    } catch (error) {
        res.json(error);
    }
};

module.exports = {
    postProduct,
    getProduct,
    getSellerAds,
    deleteProduct,
    updateProduct,
    getAllProducts,
    getProdBySub_CategoryName,
    getProductsBySearch,
    getProductsBySearchInProperties,
    deleteAllProductWithIdSeller
};
