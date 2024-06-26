const mongoose = require("mongoose")

const messageSchema = mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    message:{
        type: String,
        required:true
    }
},{timestamps:true})

const messageModel = mongoose.model('Message',messageSchema)

module.exports = messageModel