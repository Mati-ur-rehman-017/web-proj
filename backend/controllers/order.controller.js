import createError from "../utils/createError.js";
import Order from "../models/order.model.js";
import Gig from "../models/gig.model.js";
import Stripe from "stripe";

export const intent = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE);

  const gig = await Gig.findById(req.params.id);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: gig.price * 100,
    currency: "inr",
    description: "Payments for orders",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const newOrder = new Order({
    gigId: gig._id,
    img: gig.cover,
    title: gig.title,
    buyerId: req.userId,
    sellerId: gig.userId,
    price: gig.price,
    payment_intent: paymentIntent.id,
  });

  await newOrder.save();

  res.status(200).send({
    clientSecret: paymentIntent.client_secret,
  });
};

export const getOrders = async (req, res, next) => {
  try {
    console.log("HER");
    const { userId } = req.query; // Extract buyerId from query parameters

    const orders = await Order.find({ buyerId: userId }); // Fetch orders based on the filter
    console.log(orders);
    res.status(200).send(orders); // Send filtered orders
  } catch (err) {
    next(err);
  }
};


export const confirm = async (req, res, next) => {
  try {
    const orders = await Order.findOneAndUpdate(
      {
        payment_intent: req.body.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );

    res.status(200).send("Order has been confirmed.");
  } catch (err) {
    next(err);
  }
};


export const createOrder = async (req, res) => {
  try {
    const { orders } = req.body;
    console.log("here");
    console.log(req.body);
    if (!orders || !Array.isArray(orders) || orders.length === 0) {
      return res.status(400).json({ message: "Orders array is required." });
    }

    const createdOrders = await Order.insertMany(orders);

    res.status(201).json(createdOrders);
  } catch (error) {
    console.error("Error creating orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const deleteOrder =async (req,res)=>{
  const { id } = req.params;
  try {
    await Order.findByIdAndDelete(id); // Replace with your ORM method
    res.status(200).send({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error deleting order", error });
  }
}