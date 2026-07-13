import passport from "passport";
import { body, matchedData, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "../config/passport.js";

const loginValidations = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email can not be empty")
    .isEmail()
    .withMessage("Emaail must be in the format abx@xyz.com"),
  body("password")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Password can not be empty")
    .isLength({ min: 8 })
    .withMessage("Password must have atleast 8 characters")
    .isStrongPassword()
    .withMessage(
      "Passwords must include an uppercase letter, a lowercase letter, a number, and a symbol.",
    ),
];

const logIn = [
  loginValidations,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    } else {
      next();
    }
  },
  function (req, res, next) {
    passport.authenticate("local", function (err, user, info) {
      if (err) {
        console.error(err);
        next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info.message });
      }

      req.logIn(user, { session: false }, function (err) {
        if (err) {
          console.log(err);
        } else {
          jwt.sign({ userId: user.id }, process.env.SECRET, (err, token) => {
            res.json({ token });
          });
        }
      });
    })(req, res, next);
  },
];

export { logIn };
