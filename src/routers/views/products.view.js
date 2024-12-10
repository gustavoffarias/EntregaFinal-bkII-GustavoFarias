import { Router } from "express";
import { showProducts, showOneProducts, readAll } from "../../controllers/products.controller.js";

const productsViewRouter = Router();

productsViewRouter.get("/", showProducts);
productsViewRouter.get("/:pid", showOneProducts);

export default productsViewRouter;
