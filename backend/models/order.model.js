import mongoose from "mongoose";
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sellerId: {
      type: String,
      required: true,
    },
    buyerId: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    payment_intent: {
      type: String,
      required: true,
    },
    img:{
      type:String,
      required:false,
    },
    price:{
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", OrderSchema);
