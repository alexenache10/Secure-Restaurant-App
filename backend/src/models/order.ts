import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  deliveryDetails: {
    addressLine1: { type: String, required: true },
    city: { type: String, required: true },
  },
  cartItems: [
    {
      quantity: { type: Number, required: true },
      name: { type: String, required: true },
    },
  ],
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;