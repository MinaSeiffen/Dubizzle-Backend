const mongoose = require("mongoose")

const conversationSchema = mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    messages: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default:[]
    },],
  },
  { timesstamps: true});

const conversationModel = mongoose.model("Conversation", conversationSchema)

module.exports = conversationModel