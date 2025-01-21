import { Router } from "express";
import apiRouter from "./api/index.api.js";
import viewRouter from "./views/index.view.js";
import productsRouter from "./products.router.js";
import usersRouter from "./user.router.js";
import cartsRouter from "./carts.router.js";
//aca creamos o configuramos los enrutadores principales de la app de backend

const router = Router();

router.use("/", viewRouter);
router.use("/api", apiRouter);

router.use("/products", productsRouter);
router.use("/users", usersRouter);
router.use("/carts", cartsRouter);

export default router;
