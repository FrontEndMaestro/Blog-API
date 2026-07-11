import passport from "passport";

import { Strategy as localStrategy } from "passport-local";
import * as userModel from "..//models/user";

import bcrypt from "bcrypt";

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

passport.use(
  new localStrategy(customFields, async function verify(
    username,
    password,
    done,
  ) {
    try {
      const user = await userModel.findUserByEmail(username);
      console.log(user);
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      } else {
        const hashedPassword = user.password;
        const passwordMatches = await bcrypt.compare(password, hashedPassword);
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
