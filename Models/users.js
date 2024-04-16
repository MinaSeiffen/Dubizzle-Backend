const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      },
      message: 'Invalid email format'
    }
  },
  dateOfBirth: {
    day:{type:String,default:"DD"},
    month:{type:String,default:"MM"},
    year:{type:String,default:"YYYY"},
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Prefer not to say"]
  },
  about: { type: String, default: "" },
  password: { type: String },
  phoneNumber: { type: String},
  profile: {
    name: { type: String, required: true },
    avatar: { type: String, default: '' },
    location: { type: String },
    bio: { type: String, default: '' },
  },
  roles: {},
  refreshToken: String,
  likedProducts: [{
    type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      default:[]
  }
  ]
}, { timestamps: true });

const userModel = mongoose.model('user', userSchema)


module.exports =  userModel 
