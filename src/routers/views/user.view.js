import { Router } from "express";
import { registerView } from "../../controllers/users.controller.js";

const usersViewRouter = Router();

usersViewRouter.get("/register", registerView);

export default usersViewRouter;
