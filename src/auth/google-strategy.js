//Instalar npm i passport-google-oauth20
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import "dotenv/config";
import { userService } from "../services/user.services.js";

const strategyConfig = {
  clientID: process.env.CLIENT_ID_GOOGLE,
  clientSecret: process.env.CLIENT_SECRET_GOOGLE,
  callbackURL: "/user/oauth2/redirect/accounts.google.com",
  scope: ["profile", "email"],
  state: true,
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile._json.email;
    const user = await userService.getUserByEmail(email);
    if (user) return done(null, user);
    const newUser = await userService.register({
      firstName: profile._json.given_name,
      lastName: profile._json.family_name,
      email: email,
      password: " ",
      image: profile._json.picture,
      isGoogle: true,
    });
    return done(null, newUser);
  } catch (error) {
    done(error);
  }
};

passport.use("google", new GoogleStrategy(strategyConfig, registerOrLogin));

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
