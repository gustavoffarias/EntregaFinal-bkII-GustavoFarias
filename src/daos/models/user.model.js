import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  cartId: {
    type: Number,
    required: false,
  },
  role: {
    type: String,
    default: "user",
  },
  image: {
    type: String,
  },
  isGithub: {
    type: Boolean,
    default: false,
  },
  isGoogle: {
    type: Boolean,
    default: false,
  },
});

export const UserModel = model("users", UserSchema);