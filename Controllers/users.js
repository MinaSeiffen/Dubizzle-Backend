const userModel  = require('../Models/users');

const getUserProfile = async (req, res, next) => {
    const id = req.params.id;
    try {
        const userData = await userModel.findOne({ _id: id });
        res.status(200).json({ Profile_id: id, userData });
    } catch (err) {
        res.status(401).json({ MSG: "That User id is invalid" });
    }
};

const getProfileData = async (req, res, next) => {
    const id = req.userId;
    try {
        const userData = await userModel.findOne({ _id: id });
        res.status(200).json({email:userData.email, name: userData.profile.name,phoneNumber:userData.phoneNumber
            ,about:userData.about,gender:userData.gender});
           
            // day:userData.dateOfBirth.day, month:userData.dateOfBirth.month,year:userData.dateOfBirth.year
    } catch (err) {
        res.status(401).json({ MSG: "That User id is invalid" });
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const users = await userModel.find({});
        res.status(201).json(users);
    } catch (err) {
        res.status(401).json({ MSG: "That User id is invalid" });
    }
};

const getMyProfile = async (req, res, next) => {
    try {
        const userID = req.userId;
        const myProfile = await userModel.findOne({ _id: userID });
        res.status(200).json({profile: myProfile})
    } catch (error) {
        res.status(404).json({ MSG: "That User id is invalid" });
    }
}

const updateProfile = async (req, res, next) => {
    const userID = req.userId
    const updates = req.body;
    try {
        const updatedProfile = await userModel.findOneAndUpdate({ _id: userID }, {
            $set: {
                'profile.name': updates.name,
                'email': updates.email,
                'dateOfBirth': updates.dateOfBirth,
                'gender': updates.gender,
                'about': updates.about,
                'phoneNumber': updates.phoneNumber,
            }
        }, { new: true, runValidators: true });
        if (updatedProfile) {
            res.status(201).json({ MSG: "Update Successful", updated_Profile: updatedProfile });
        } else {
            res.status(401).json({ MSG: "User not found" });
        }
    } catch (err) {

        res.status(401).json({ MSG: "Error updating user profile",erorr:err.message });
    }
};

const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    try {
        const deletedUser = await userModel.deleteOne({ _id: id });
        if (deletedUser.deletedCount > 0) {
            res.status(201).json({ MSG: "Your profile has been deleted from Dubizzle" });
        } else {
            res.status(401).json({ MSG: "User not found" });
        }
    } catch (err) {
        res.status(401).json({ MSG: "Error deleting user profile" });
    }
};

const addProductToFavourite = async (req, res, next) => {
    try {

        const userId = req.userId
        const {_id:productId} = req.body

        const user = await userModel.findOne({_id:userId})

        if(!user){
            console.log("there no user with this id")
        }

        const productIndex = user.likedProducts.indexOf(productId);

        if(!productIndex){
            console.log("there no product with this id")
        }
        if (productIndex === -1) {
            user.likedProducts.push(productId)
            await user.save()
            return res.status(201).json({ MSG: "Added to favourites", user })
        } else {
            return res.status(500).json({ MSG: 'This Product is already in your Favorites' })
        }

    } catch (error) {

        return res.status(500).json({ "error":"There was an Error Processing Your Request"})
    }
}


const getUserFavouriteProducts = async (req, res, next) => {
    try {
        const userId  = req.userId
        const user = await userModel.findById(userId).populate("likedProducts")
        if(!user){
            console.log("there is no user")
            res.status(404).json({MSG:"No User Found!"})
        }
        res.status(200).json({favourites:user.likedProducts})
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
}

const deleteProductFromFavourite = async(req,res,next) =>{
    try {
        const userId  = req.userId
        const { _id:productId } = req.body

        const user = await  userModel.findByIdAndUpdate(userId,{$pull:{likedProducts:productId}},{new:true})
       if(!user){
        res.status(404).json({MSG:'user user not in database'});
       }
        res.status(200).json({MSG:'Deleted from favorite list',user});
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
}

const updateUserProfile = async(req,res,next)=>{
    try {
        const userId = req.userId
        const newData=req.body

        let updatedUser =await userModel.findOneAndUpdate({ _id: userId }, newData, { new: true, runValidators: true });
        if (updatedUser) {
            res.status(200).json({"Updated User Profile":updatedUser})
        }else{
            return res.status(400).json({MSG:"No User Found!"})
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:"Internal Server Error"})
    }
}


const getUserForSideBar = async (req , res , next)=>{
    try {
        const loggedInUser = req.userId
        const allUsers = await userModel.find({_id: {$ne : loggedInUser}}).select("-password")

        res.status(200).json({allUsers})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    getUserProfile, updateProfile, deleteUser, getUserForSideBar,
    getAllUsers, addProductToFavourite, getUserFavouriteProducts , getProfileData , getMyProfile , deleteProductFromFavourite, updateUserProfile
};