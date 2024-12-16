import jwt from "jsonwebtoken";
import "dotenv/config";

export const checkAuthHeaders = async (req, res, next) => {
  try {
    const token = req.get("Authorization");
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const tokenClean = token.split(" ")[1];
    const payloadDecode = jwt.verify(tokenClean, process.env.SECRET_KEY);
    console.log(payloadDecode);
    req.user = payloadDecode;
    next();
  } catch (error) {
    throw new Error(error);
  }
};

export const checkAuthCookies = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const payloadDecode = jwt.verify(token, process.env.SECRET_KEY);
    console.log(payloadDecode);
    req.user = payloadDecode;
    next();
  } catch (error) {
    throw new Error(error);
  }
};
