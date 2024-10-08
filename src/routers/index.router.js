import { Router } from "express";
import apiRouter from "./api/index.api.js";
import viewRouter from "./views/index.view.js";

//aca creamos o configuramos los enrutadores principales de la app de backend

const router = Router();

router.use("/", viewRouter);
router.use("/api", apiRouter);

export default router;
