import mongoose from "mongoose";
const { Schema } = mongoose;

const ItemSchema = new Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category:{
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("item", ItemSchema);
