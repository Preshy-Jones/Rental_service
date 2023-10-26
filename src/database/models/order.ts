import mongoose from "mongoose";
import { nanoid } from "nanoid";

const { Schema } = mongoose;

const orderSchema = new Schema({
  _id: {
    type: String,
    default: nanoid,
  },
  title: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
