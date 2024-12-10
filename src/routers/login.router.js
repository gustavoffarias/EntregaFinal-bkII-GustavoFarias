import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  const { firstName, email } = req.body;
  res.cookie(firstName, email, { maxAge: 10000 }).send("AGGREGATE COOKIE");
});

export default router;
