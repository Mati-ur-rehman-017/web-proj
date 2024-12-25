import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
import itemRoute from "./routes/item.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

dotenv.config();

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
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/item",itemRoute);

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