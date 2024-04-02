const conversationModel = require("../Models/conversation.js");
const messageModel = require("../Models/messages.js");
const { getRecieverId , io} = require("../socket/socket.js");


const sendMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    const receiverId = req.params.id;
    const senderId = req.userId;

    let conversation = await conversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await conversationModel.create({
        participants:  [senderId, receiverId] ,
        messages:[]
      });
    }

    const newMessage = new messageModel({
        senderId: senderId,
        receiverId: receiverId,
        message: message
    })
    
    if (newMessage) {
        conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save() , newMessage.save()])
    
    const recieverSocketId = getRecieverId(receiverId)
    if (recieverSocketId) {
      io.to(recieverSocketId).emit("newMessage" , newMessage)
    }
    
    res.status(200).json(newMessage)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMessage = async (req, res, next) => {
  try {
    
    const {id: userToChatId} = req.params
    const senderId = req.userId

    const conversation = await conversationModel.findOne({
        participants:{ $all: [senderId, userToChatId] }
    }).populate("messages")

    if (!conversation) {
        return res.status(404).json([])
    }

    let messages = conversation.messages

    res.status(200).json(messages)
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {getMessage ,sendMessage }