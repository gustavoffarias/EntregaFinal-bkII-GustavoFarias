import { Schema, model } from "mongoose";

const collection = "users";
const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  photo: {
    type: String,
    default:
      "https://e7.pngegg.com/pngimages/507/702/png-clipart-profile-icon-simple-user-icon-icons-logos-emojis-users-thumbnail.png",
  },
  role: { type: String, enum: ["user", "admin", "prem"], default: "user" },
  isOnline: { type: Boolean, default: false },
});

const User = model(collection, schema);

export default User;
