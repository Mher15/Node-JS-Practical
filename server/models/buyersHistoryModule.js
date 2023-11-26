const mongoose = require("mongoose");


const buyersHistorySchema = new mongoose.Schema({
    products: {
        type: Array,
        default: null,
    },
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
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

const BuyersHistory = mongoose.model("BuyersHistory", buyersHistorySchema);

module.exports = BuyersHistory;
