const ProductModul = require('../models/productModule');
const BuyersHistoryModul = require('../models/buyersHistoryModule');
const UserModel = require("../models/userModel");
const ProductDto = require('../dtos/productDto')

class ProductService {
    async findAll() {
        return await ProductModul.find({});
    }

    async addProduct(name, price) {
        const product = await ProductModul.create({
            name, price
        });
        const productDto = new ProductDto(product);
        return { product: productDto };
    }

    async updateProduct(id, name, price) {
        const product = await ProductModul.findByIdAndUpdate(
            id,
            { name, price: Number(price) },
            { new: true }
        );

        return product;
    }

    async buyProduct(data, email) {
        const user = await UserModel.findOne({ email });
        const product = await BuyersHistoryModul.create({
            userId: user._id,
            products: data
        });
        return product;
    }

    async findAllMyPurchases(email) {
        const user = await UserModel.findOne({ email });
        const products = await BuyersHistoryModul.find({ userId: user._id })
        return products;
    }

    async findAllPurchases(email) {
        const data = await BuyersHistoryModul.find({})
        const newData = [];
        for await (let item of data) {
            const user = await UserModel.findOne({ _id: item.userId });
            item.products.forEach((product) => {
                newData.push({
                    products: product,
                    username: user.username
                })
            })

        }
        return newData;
    }
}

module.exports = new ProductService();
