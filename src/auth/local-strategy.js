import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { userService } from "../services/user.services.js";

const strategyConfig = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
};

const register = async (req, email, password, done) => {
  try {
    const user = await userService.getUserByEmail(email);
    if (user) return done(null, false, { messages: "User already exists" });
    const newUser = await userService.register(req.body);
    return done(null, newUser);
  } catch (error) {
    done(error);
  }
};

const login = async (req, email, password, done) => {
  try {
    const userLogin = await userService.login(email, password);
    if (userLogin) return done(null, userLogin);
  } catch (error) {
    done(error);
  }
};

const registerStrategy = new LocalStrategy(strategyConfig, register);
const loginStrategy = new LocalStrategy(strategyConfig, login);

passport.use('login', loginStrategy);
passport.use('register', registerStrategy);

passport.serializeUser((user, done) => {
  try {
    done(null, user._id);
  } catch (error) {
    done(error);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userService.getUserById(id);
    return done(null, user);
  } catch (error) {
    done(error);
  }
});