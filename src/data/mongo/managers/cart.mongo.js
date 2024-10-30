import Cart from "../models/carts.model.js";
import MongoManager from "./manager.mongo.js";

const cartsMongoManager = new MongoManager(Cart);
export default cartsMongoManager;
