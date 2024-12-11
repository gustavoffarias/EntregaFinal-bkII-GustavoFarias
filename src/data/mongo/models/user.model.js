import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  firstName: { type: String, required: true},
  lastName: { type: String, required: true},
  age: { type: Number, required: true},
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  cartId: {type: Number},
  role: {
    type: String,
    enum: ["user", "admin", "prem"],
    default: "user",
    index: true,
  }
});


export const UserModel = model("users", UserSchema);