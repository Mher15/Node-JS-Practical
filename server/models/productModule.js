const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        default: null,
    },
    price: {
        type: Number,
        default: null,

    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    modifiedAt: {
        type: Date,
        default: new Date(),
    },
    deletedAt: {
        type: Date,
        default: null,
    },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
