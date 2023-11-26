const express = require("express");
const router = express.Router();
const userRouter = require('./users/UserRouter');
const authRouter = require('./auth/authRouter');
const productRouter = require('./product/productRouter');

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/product", productRouter)

module.exports = router;
