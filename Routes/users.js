const { getUserProfile, updateProfile, deleteUser, postUser, getUserForSideBar,
    getAllUsers, addProductToFavourite, getMyProfile, getProfileData, getUserFavouriteProducts, deleteProductFromFavourite } = require('../Controllers/users')
const express = require('express')
const router = express.Router()
const verifyJWT = require('../middleware/verifyJWT')


router.get('/getUser/:id', getUserProfile)
router.get('/user', verifyJWT, getProfileData)
router.get('/favourites', verifyJWT, getUserFavouriteProducts)
router.post('/addFavourite', verifyJWT, addProductToFavourite)
router.delete('/removeFavourite', verifyJWT, deleteProductFromFavourite)
router.get("/", getAllUsers)
router.get("/sideBar", verifyJWT, getUserForSideBar)
router.get("/getMyProfile", verifyJWT, getMyProfile)
router.patch('/', verifyJWT, updateProfile)
router.patch('/:userId/:productId', addProductToFavourite)
// router.patch('/:productId' ,verifyJWT,addProductToFavourite)
router.delete('/:id', deleteUser)

module.exports = router
