const ProductService = require('../service/ProductService');

class ProductController {
    async findAllProducts(req, res, next) {
        try {
            const products = await ProductService.findAll()
            if (!products) {
                res.status(404).send({ message: "Product not found", success: false });
            } else {
                res.status(200).send({
                    success: true,
                    data: products,
                });
            }
        } catch (e) {
            res
                .status(500)
                .send({ message: e.message, error: e.errors, success: false });
        }
    }

    async addProduct(req, res, next) {
        try {
            const { name, price } = req.body;
            const product = await ProductService.addProduct(
                name, Number(price)
            );
            if (!product) {
                res.status(404).send({ message: "Product not found", success: false });
            } else {
                res.status(200).send({
                    success: true,
                    data: product,
                });
            }
        } catch (e) {
            res
                .status(500)
                .send({ message: e.message, error: e.errors, success: false });
        }
    }

    async updateProduct(req, res, next) {
        try {
            const { name, price, id } = req.body;
            const product = await ProductService.updateProduct(
                id, name, Number(price)
            );
            if (!product) {
                res.status(404).send({ message: "Product not found", success: false });
            } else {
                res.status(200).send({
                    success: true,
                    data: product,
                });
            }
        } catch (e) {
            res
                .status(500)
                .send({ message: e.message, error: e.errors, success: false });
        }
    }

    async buyProduct(req, res, next) {
        try {
            const data = req.body;
            const { email } = req?.user
            const product = await ProductService.buyProduct(data, email);
            if (!product) {
                res.status(404).send({ message: "Product not found", success: false });
            } else {
                res.status(200).send({
                    success: true,
                    data: product,
                });
            }
        } catch (e) {
            res
                .status(500)
                .send({ message: e.message, error: e.errors, success: false });
        }
    }

    async findAllMyPurchases(req, res, next) {
        try {
            const { email } = req?.user
            const products = await ProductService.findAllMyPurchases(email);
            if (!products) {
                res.status(404).send({ message: "Products not found", success: false });
            } else {
                res.status(200).send({
                    success: true,
                    data: products,
                });
            }
        } catch (e) {
            res
                .status(500)
                .send({ message: e.message, error: e.errors, success: false });
        }
    }
   
    async findAllPurchases(req, res, next) {
        try {
            const { email } = req?.user
            const products = await ProductService.findAllPurchases(email);
            if (!products) {
                res.status(404).send({ message: "Products not found", success: false });
            } else {
                res.status(200).send({
                    success: true,
                    data: products,
                });
            }
        } catch (e) {
            res
                .status(500)
                .send({ message: e.message, error: e.errors, success: false });
        }
    }
}

module.exports = new ProductController();