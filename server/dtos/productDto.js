module.exports = class ProductDto {
    name;
    price;
    constructor(model) {
        this.name = model.name;
        this.price = model.usernpriceame;
    }
};
