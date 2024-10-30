import { response } from "express";
import Controller from "./controller.js";
import cartsMongoManager from './../data/mongo/managers/cart.mongo.js';

//Con Mongo
const cartsController = new Controller(cartsMongoManager, "CARTS");
const { create, readAll, read, update, destroy } = cartsController;

export {
  create,
  readAll,
  read,
  update,
  destroy,
};
