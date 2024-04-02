const productModel = require('../Models/products')

async function checkSeller(req, res, next) {
    let sellerID = req.id;
    let prdID = req.params.id;
    try {
        const product = await productModel.findById(prdID);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' })
        }
        if(product.sellerId == sellerID){

            next()
        }

    }catch(err){
        res.status(500).json({message:err.message})
    }
}
module.exports = checkSeller