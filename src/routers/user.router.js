//import { Router } from "express";
//import userManager from "../data/mongo/managers/user.mongo.js";

import { Router } from "express";
import {
  registerResponse,
  loginResponse,
} from "../data/mongo/managers/user.mongo.js";
import passport from "passport";
import { isAuth } from "../middlewares/isAuth.js";

const router = Router();

router.post("/register", passport.authenticate("register"), registerResponse);

router.post("/login", passport.authenticate("login"), loginResponse);

router.get("/private", isAuth, (req, res) => res.send("ruta privada"));

export default router;

/*
//Implementacion sin PASSPORT, sin DAOS
const router = Router();

router.post("/register", async (req, res) => {
  try {
    const newUser = await userManager.register(req.body);
    if (!newUser)
      return res.redirect("/error", { message: "usuario existente" });
    return res.redirect("/");
  } catch (error) {
    res.render("error", { error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userManager.login(email, password);
    if (user) {
      req.session.email = email;
      res.render("home");
    }
  } catch (error) {
    res.render("error", { error });
  }
});

export default router;
*/
