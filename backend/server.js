import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import authRoute from "./routes/auth.route.js";
import itemRoute from "./routes/item.route.js";
import cors from "cors";
import Stripe from "stripe";

dotenv.config();

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;


const connect = async () => {
  try {
    // console.log(process.env.DB);
    await mongoose.connect(process.env.DB);
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  }
};

const PORT =  5000;
const corsOptions = {
  origin: "http://localhost:5173",  // Replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,  // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));  // Use CORS with the configured options
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/item",itemRoute);
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body; // Expect amount in cents from frontend

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents
      currency: 'usd',
      payment_method_types: ['card'], // Specify allowed payment methods
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error.message);
    res.status(500).json({ error: "Failed to create payment intent" });
  }
});
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(PORT, () => {
  connect();
  console.log("Backend server is running!");
});
export default app;