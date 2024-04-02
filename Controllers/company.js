// const companyModel=require("../models/companyschema");



// const getAllCompanies=(req,res,next)=>{
   
//     adminModel.find().populate({path:'properties_ID
//     ',select:''}).then((company)=>{
//         res.status(200).json({compamy})
//     }).catch((error)=>{
//         res.status(501).json(error.message)
//     })
   
   
//    }



//   const getById= async(req,res,next)=>{
//    try{
//     let {id}=req.params
//     let myCompany=await companyModel.findById(id)
//     if(myCompany){
//         res.status(200).json({myCompany})
//     }else{
//         res.status(400).json("it is not exist ")
//     }
   
// }catch(err){
// res.status(404).json("catch error")

// }

// }





//   const saveCompany =async(req,res,next) => {
//     let body=req.body

//     try{
//     let newCompany=await companyModel.create(body)
//     res.json({message:"created",createdcompany:newAdmin})
//     }catch(err){
//         res.json(err)
//     }
//    }


   
// const updateCompanyById = async(req, res, next) => {
//     let body = req.body
//     let { id } = req.params
// try{
//     const newCompany= await companyModel.findOneAndUpdate({_id:id},body,{new:true,runValidators:true})

//     res.status(200).json(newCompany)

// }catch(err){
//     res.status(500).json(err)
// }

// }


   module.exports={getAllCompanies,getById,saveCompany,updateCompanyById}