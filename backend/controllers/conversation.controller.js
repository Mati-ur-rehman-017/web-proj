import createError from "../utils/createError.js";
import Conversation from "../models/conversation.model.js";

export const createConversation = async (req, res, next) => {
  const newConversation = new Conversation({
    id: req.body.isSeller ? req.body.userId + req.body.to : req.body.to + req.body.userId,
    sellerId: req.body.isSeller ? req.body.userId : req.body.to,
    buyerId: req.body.isSeller ? req.body.to : req.body.userId,
    readBySeller: req.body.isSeller,
    readByBuyer: !req.body.isSeller,
  });

  try {
    const savedConversation = await newConversation.save();
    const populatedConversation = await Conversation.populate(
      savedConversation,
      { path: "sellerId buyerId" }
    );
    res.status(201).send(populatedConversation);
  } catch (err) {
    next(err);
  }
};

export const updateConversation = async (req, res, next) => {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
        },
      },
      { new: true }
    );

    res.status(200).send(updatedConversation);
  } catch (err) {
    next(err);
  }
};

export const getSingleConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id })
      .populate("sellerId")
      .populate("buyerId");

    if (!conversation) {
      console.log("Conversation not found");
      return next(createError(404, "Conversation not found!"));
    }

    res.status(200).send(conversation);
  } catch (err) {
    next(err); // Ensure errors are passed to the middleware
  }
};


export const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({
      $or: [
        { sellerId: req.query.userId },
        { buyerId: req.query.userId }
      ]
    })
      .populate("sellerId")
      .populate("buyerId")
      .sort({ updatedAt: -1 });
    console.log("Conversations:", conversations);
    res.status(200).send(conversations);
  } catch (err) {
    next(err);
  }
};
