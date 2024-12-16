//Instalar npm i jsonwebtoken
import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateToken = (user) => {
  const payload = {
    firstName: user.first_name,
    lastBame: user.last_name,
    email: user.email,
    age: user.age,
    role: user.role,
  };

  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "20m" });
};
