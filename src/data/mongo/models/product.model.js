import { Schema, model } from "mongoose";

const collection = "products";
const schema = new Schema({
  title: { type: String, required: true },
  photo: { type: String, default: "https://cdn-icons-png.flaticon.com/512/1170/1170628.png" },
  price: { type: Number, default: 1 },
  category: { type: String, default: "Varios" },
  stock: { type: Number, default: 1 },
});

const Product = model(collection, schema);

export default Product;
