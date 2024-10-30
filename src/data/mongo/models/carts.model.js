import { Schema } from "mongoose";

const collection = "carts"
const schema = new Schema ({
    user_id: { type: Types.Objectid, ref: "users", required: true},
    product_id: { type: Types.Objectid, ref: "products", required: true},
    quantity: { type: Number, default: 1},
    state: { type: String, default: "reserved", enum: ["reserved", "paid", "delivered"]}
})

const Cart = model(collection, schema)
export default Cart