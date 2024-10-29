import { Router } from "express";
import {
  getAllProducts,
  createGet,
  getProduct,
  //update,
  deleteProduct,
  //create,
  showProducts,
  showOneProducts,
  create,
  readAll,
  read,
  update,
  destroy,
} from "../../controllers/products.controller.js";
import validData from "../../middlewares/validData.mid.js";

const productsRouter = Router();

//rutas de products
productsRouter.get("/", getAllProducts);
productsRouter.get("/:pid", getProduct);
// Ruta par crear un products, por ejemplo /producto/titulo del producto/categoria/10000
productsRouter.get("/:title/:photo/:category/:price", createGet);
// Ruta par crear un producto
productsRouter.post("/", create);
// Ruta para actualizar
productsRouter.put("/:pid", update);
// Ruta para eliminar
productsRouter.delete("/:pid", deleteProduct);

export default productsRouter;
