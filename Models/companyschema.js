const mongoose =require("mongoose")

const companySchema=mongoose.Schema({
     username:{
        type:String,
        minLength:[4,"minimum lenghth is 4"],
        maxLength:[20,"maximum lenghth is10"],
        trim:true,
        required:[true,"title isrequired"],


     },
     email:{
        type: String,
        validate: {
          validator: function(v) {
            return /^[a-zA-Z]{3,10}[0-9]{2,}(@)(gmail|yahoo)(.com)$/.test(v);
          },
          message: props => `${props.value} is not a valid email!`
    },required: true},
    password:{
        type:Number,
        required: true,
    }
})


const companyModel=mongoose.model('company',companySchema)

module.exports=companyModel