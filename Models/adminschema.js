const mongoose = require("mongoose")
const adminsSchema = mongoose.Schema({
  username: {
    type: String,
    index: true,
    unique: true,
    minLength: [6, "minimum lenghth is 6"],
    maxLength: [15, "maximum lenghth is 15"],
    trim: true,
    required: [true, "title isrequired"],
  },
  email: {
    type: String,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      },
      message: 'Invalid email format'
    },
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  roles: {},
  refreshToken: String
}, { collection: 'Admins' })


const adminModel = mongoose.model('Admins', adminsSchema)

module.exports = adminModel
