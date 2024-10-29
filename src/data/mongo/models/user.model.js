import { Schema, model } from "mongoose";

const collection = "users";
const schema = new Schema({
  name: { type: String, required: true },
  photo: {
    type: String,
    default:
      "https://e7.pngegg.com/pngimages/507/702/png-clipart-profile-icon-simple-user-icon-icons-logos-emojis-users-thumbnail.png",
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "Varios" },
});

const User = model(collection, schema);

export default User;
