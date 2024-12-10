import { Schema, Types, model } from "mongoose";

const collection = "carts";
const schema = new Schema({
  user_id: { type: Types.ObjectId, ref: "users", required: true, index: true },
  product_id: { type: Types.ObjectId, ref: "products", required: true },
  quantity: { type: Number, default: 1 },
  state: {
    type: String,
    default: "reserved",
    enum: ["reserved", "paid", "delivered"],
    index: true,
  },
});

const Cart = model(collection, schema);
export default Cart;
