const express = require("express");
const productRouter = express.Router();
const ProductController = require("../../controllers/ProductController");
const { body } = require("express-validator");
const authMiddleware = require('../../middlewares/authMiddleware');

productRouter.get('/', authMiddleware, ProductController.findAllProducts)
productRouter.post(
    "/add",
    authMiddleware,
    ProductController.addProduct
);
productRouter.put("/update", authMiddleware, ProductController.updateProduct);
productRouter.post(
    "/buy",
    authMiddleware,
    ProductController.buyProduct
);
productRouter.get(
    "/my-purchases",
    authMiddleware,
    ProductController.findAllMyPurchases
);
productRouter.get(
    "/find-all-purchases",
    authMiddleware,
    ProductController.findAllPurchases
);



module.exports = productRouter;
