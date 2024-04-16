const express = require("express");
const router = express.Router();
const {
  getProduct,
  postProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProdBySub_CategoryName,
  getSellerAds,
  getProductsBySearch,
  getProductsBySearchInProperties,
  deleteAllProductWithIdSeller,
  getMyAdds
} = require("../Controllers/products");
const verifyJWT = require("../middleware/verifyJWT");

router.get("/get/:id", getProduct);
router.get("/search", getProductsBySearch);
router.get("/search/:subCategoryName", getProductsBySearchInProperties);
router.get("/getUserAds/:userId", getSellerAds);
router.get("/getbysubcateboryname", getProdBySub_CategoryName)
router.get("/get", getAllProducts);
router.get("/getmyadds", verifyJWT, getMyAdds)
router.post("/add", verifyJWT, postProduct);
router.patch("/:id", updateProduct);
router.delete("/delete/:id", verifyJWT ,deleteProduct);
router.delete("/userProducts/:idSeller", deleteAllProductWithIdSeller);

module.exports = router;
