//import { Router } from "express";
//import userManager from "../data/mongo/managers/user.mongo.js";

import { Router } from "express";
import {
  registerResponse,
  loginResponse,
  githubGoogleResponse,
  registerJWT,
  loginJWT,
  privateDataJWT
} from "../data/mongo/managers/user.mongo.js";
import passport from "passport";
import { isAuth } from "../middlewares/isAuth.js";
//import { passportCall } from "../middlewares/passportCall.js";
//import { checkAuthCookies, checkAuthHeaders } from "../middlewares/checkAuth.js";
import { passportCall } from "../passport/passportCall.js";
import { roleAuth } from '../middlewares/roleAuth.js'

const router = Router();

router.post("/register", passport.authenticate("register"), registerJWT);

router.post("/login", passport.authenticate("login"), loginJWT);

//Inicio de sesion con GitHub

router.get(
  "/register-github",
  passportCall("github", { scope: ["user:email"] })
);

router.get(
  "/profile-github",
  passportCall("github", { scope: ["user:email"] }),
  githubGoogleResponse
);

/*
router.get('/profile-github', passport.authenticate('github', {

  failureRedirect: '/login', ///error-login
  successRedirect: '/profile', 
  passReqToCallback: true
}));
*/

//Inicio de sesion con Google
router.get(
  "/oauth2/redirect/accounts.google.com",
  passportCall("google", { assignProperty: "user" }),
  githubGoogleResponse
);

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("logout ok");
});

router.get("/private", isAuth, (req, res) => res.send("ruta privada"));

router.get("/private-headers", passportCall('jwt'), privateDataJWT);

router.get("/private-cookies", [passportCall('jwtCookies'), roleAuth('user')], privateDataJWT);

router.get("/private-cookies-admin", [passportCall('jwtCookies'), roleAuth('admin')], privateDataJWT);

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
