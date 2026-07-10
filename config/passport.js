import passport from "passport";

import { Strategy as localStrategy } from "passport-local";
import * as userModel from "..//models/user";

import bcrypt from "bcrypt";

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

passport.use(
  new localStrategy(customFields, function verify(username, password, done) {
    try {
      const user = userModel.findUserByName(username);
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      } else {
        const hashedPassword = user.password;
        const passwordMatches = bcrypt.compare(password, hashedPassword);

        if (!passwordMatches) {
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user);
      }
    } catch (error) {
      console.log(error);
    }
  }),
);
