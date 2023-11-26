const express = require("express");
const userRouter = express.Router();
const UserController = require("../../controllers/UserController");
const { body } = require("express-validator");
const authMiddleware = require('../../middlewares/authMiddleware');

userRouter.get("/getMe", authMiddleware, UserController.getMe);
module.exports = userRouter;
