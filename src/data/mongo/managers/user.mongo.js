//import { UserModel } from "../models/user.model.js";
//import { createHash, isValidPassword } from "../../../utils/utils.js";

import { generateToken } from "../../../auth/jwt.js";
import * as services from "../../../services/user.services.js";

export const registerResponse = (req, res, next) => {
  try {
    res.json({
      message: "Register OK",
      session: req.session,
    });
  } catch (error) {
    next(error);
  }
};


export const loginResponse = async (req, res, next) => {
  try {
    const id = req.session.passport.user || null;
    const user = await services.getUserById(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const githubGoogleResponse = (req, res, next) => {
  try {
    const { firstName, lastName, email, isGithub, isGoogle, image } = req.user;
    res.json({
      msg: "Register/Login Github OK",
      session: req.session,
      userData: {
        firstName,
        lastName,
        email,
        isGithub,
        isGoogle,
        image,
      },
    });
  } catch (error) {
    next(error);
  }
};

//Implementacion JWT
export const registerJWT = async (req, res, next) => {
  try {
    const user = await services.register(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const loginJWT = async (req, res, next) => {
  try {
    const user = await services.login(req.body);
    const token = generateToken(user);
    // res.header("Authorization", token).json({ message: "Login OK" });
    res.cookie('token', token, { httpOnly: true }).json({ message: 'Login OK' });
  } catch (error) {
    next(error);
  }
};

export const privateDataJWT = (req, res, next) => {
  try {
    if (!req.user)
      throw new Error("No se puede acceder a los datos del usuario");
    res.json({
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

/*
//IMPLEMENTACION SIN PASSPORT, SIN DAOS
class UserManager {
  constructor(model) {
    this.model = model;
  }
  async register(user) {
    try {
      const { email, password } = user;
      const exists = await this.getByEmail(email);
      if (exists) throw new Error("User already registered");
      if (!exists)
        return await this.model.create({
          ...user,
          password: createHash(password),
        });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getByEmail(email) {
    try {
      return await this.model.findOne({ email });
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(email, password) {
    try {
      const userExists = await this.getByEmail(email);
      if (!userExists) throw new Error("User not found");
      const passValid = isValidPassword(password, userExists);
      if (!passValid) throw new Error("Invalid credentials");
      return userExists;
    } catch (error) {
      throw new Error(error);
    }
  }
}

const userManager = new UserManager(UserModel);
export default userManager;
*/
