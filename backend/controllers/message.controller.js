import createError from "../utils/createError.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

export const createMessage = async (req, res, next) => {
  console.log("hee");
  
  const newMessage = new Message({
    conversationId: req.body.conversationId,
    userId: req.body.userId,
    desc: req.body.desc,
  });
  try {
    const savedMessage = await newMessage.save();

    const populatedMessage = await Message.populate(savedMessage, {
      path: "userId",
    });

    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.body.conversationId },
      {
        $set: {
          readBySeller: req.isSeller,
          readByBuyer: !req.isSeller,
          lastMessage: req.body.desc,
        },
      },
      { new: true }
    );

    res.status(201).send(populatedMessage);
  } catch (err) {
    console.error("Error creating message:", err);
    next(err);
  }
};


export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.id,
    }).populate("userId");
    res.status(200).send(messages);
  } catch (err) {
    next(err);
  }
};