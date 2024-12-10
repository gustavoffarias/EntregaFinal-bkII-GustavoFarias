import { Router } from "express";
import {
  create,
  destroy,
  read,
  readAll,
  update,
} from "../../controllers/carts.controller.js";

const cartsRouter = Router();

cartsRouter.post("/", create);
cartsRouter.get("/", readAll);
cartsRouter.get("/cid", read);
cartsRouter.put("/cid", update);
cartsRouter.delete("/cid", destroy);

export default cartsRouter;
