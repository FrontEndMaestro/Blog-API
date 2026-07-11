import { body, matchedData, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import passport from "passport";
import "../config/passport.js";
import * as userModel from "..//models/user.js";

const validations = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name can not be empty")
    .bail()
    .escape()
    .custom(async (username) => {
      let user;
      try {
        user = await userModel.findUserByName(username);
      } catch (error) {
        console.log(error);
        throw new Error("Unable to authenticate at this time");
      }

      if (user) {
        throw Error("Username already taken.");
      }
    }),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email can not be empty")
    .bail()
    .isEmail()
    .withMessage("Email must be in the format abx@xyz.com")
    .custom(async (email) => {
      let user;
      try {
        user = await userModel.findUserByEmail(email);
      } catch (error) {
        console.log(error);
        throw new Error("Unable to authenticate at this time");
      }

      if (user) {
        throw Error("Email already exists");
      }
    }),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password can not be empty")
    .bail()
    .escape()
    .isLength({ min: 8 })
    .withMessage("Password must have atleast 8 characters")
    .isStrongPassword()
    .withMessage(
      "Passwords must include an uppercase letter, a lowercase letter, a number, and a symbol.",
    ),
];

const Signup = [
  validations,
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = matchedData(req);
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await userModel.createUser({
      name,
      email,
      password: hashedPassword,
    });
    return res.json({ user });
  },
];

const getUser = [
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.user);
    const userId = req.params.userId;

    console.log(userId);
    res.json({ message: "You have found the user" });
  },
];

export { Signup, getUser };
