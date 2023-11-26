const express = require("express");
const authRouter = express.Router();
const AuthController = require("../../controllers/AuthController");
const { body } = require("express-validator");

authRouter.post(
  "/registration",
  body("userName").isString(),
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  AuthController.registration
);

authRouter.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  AuthController.login
);
authRouter.get('/refresh', AuthController.refresh);
authRouter.get(
  "/log-out",
  AuthController.logout
);

module.exports = authRouter;
