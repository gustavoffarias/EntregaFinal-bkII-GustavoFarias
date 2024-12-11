import { Router } from "express";
import userManager from "../data/mongo/managers/user.mongo.js";

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
  const { email, password } = req.body;
  const user = await userManager.login(email, password);
  if (user) {
    req.session.email = email;
    res.render("home");
  } else res.redirect("error", { message: "credenciales incorrectas" });
});

export default router;
